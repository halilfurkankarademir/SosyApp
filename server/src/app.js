/**
 * @fileoverview Express sunucusunu yapılandırır, başlatır ve gerekli middleware'leri,
 * veritabanı bağlantısını, soket sunucusunu ve rota yönetimini ayarlar.
 * @module src/app
 */

import express from "express";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authLimiter } from "./config/rateLimiter.js";
import { Server } from "socket.io";
import { initializeDatabase } from "./config/database.js";
import setupAssociations from "./models/associations.js";
import routes from "./routes/index.js";
import { initializeNotificationService } from "./services/notificationService.js";
import { corsConfig } from "./config/corsOptions.js";
import errorHandler from "./middlewares/errorHandler.js";
import { socketAuthMiddleware } from "./middlewares/socketAuth.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import logger from "./utils/logger.js";

// 1. Uygulama ve temel konfigürasyon
dotenv.config();
/**
 * Express uygulama örneği.
 */
const app = express();

/**
 * Node.js HTTP sunucusu. Express uygulamasını sarmalar.
 */
const server = http.createServer(app);

/**
 * Socket.IO sunucu örneği. Gerçek zamanlı iletişim için kullanılır.
 */
const io = new Server(server, {
    cors: corsConfig,
});

/**
 * Aktif kullanıcıların socket ID'lerini kullanıcı ID'leriyle eşleştiren nesne.
 * Bildirim göndermek için kullanılır.
 */
const userSockets = {};

/**
 * Swagger API dokümantasyon verisi.
 */
const swaggerDocument = JSON.parse(
    await readFile(new URL("../swagger-output.json", import.meta.url))
);

// 2. Middleware'ler

// Uygulamanın bir vekil sunucu (proxy) arkasında çalıştığını varsayarak doğru istemci IP adresini almasını sağlar.
app.set("trust proxy", 1);

// Gelen isteklerin gövdesindeki JSON verilerini ayrıştırarak req.body nesnesine yerleştirir.
app.use(express.json());

// Farklı kaynaklardan (origin) gelen tarayıcı isteklerine izin vermek için gerekli CORS başlıklarını ayarlar.
app.use(cors(corsConfig));

// Çeşitli HTTP güvenlik başlıklarını ayarlayarak uygulamanızı yaygın web zafiyetlerine karşı korur.
app.use(helmet());

// Gelen isteklerdeki cookie'leri ayrıştırarak req.cookies nesnesine yerleştirir.
app.use(cookieParser());

// Swagger UI kullanarak API dokümantasyonunu sunar.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// DDOS saldırılarına karşı belirli auth rotalarında hız sınırlaması uygular.
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

/**
 * Sunucunun birden fazla kez başlatılmasını önlemek için kullanılan Promise.
 */
let initPromise = null;

/**
 * Sunucuyu asenkron olarak başlatır. Veritabanı bağlantısını kurar,
 * model ilişkilerini ayarlar, Socket.IO'yu yapılandırır, servisleri başlatır,
 * rotaları yükler ve hata yönetimini ayarlar.
 * Sunucunun sadece bir kez başlatılmasını sağlar.
 * @async
 * @function initializeServer
 * @throws {Error} Başlatma sırasında bir hata oluşursa programı sonlandırır.
 */
export async function initializeServer() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
        try {
            logger.info("Veritabanı ve modeller yukleniyor...");
            // Veritabanı bağlantısı ve modelleri senkronize et
            await initializeDatabase();
            // Modeller arasındaki iliskileri ayarla
            setupAssociations();
            logger.info("✅ Veritabanı ve modeller yuklendi");

            // Socket token kimlik dogrulama middleware aktivasyonu
            io.use(socketAuthMiddleware);
            logger.info("✅ Socket kimlik dogrulama middleware aktif");

            // Yeni socket bağlantılarını dinle
            io.on("connection", (socket) => {
                logger.info(
                    "Bir kullanıcı bağlandı",
                    socket.id,
                    "User ID:",
                    socket.userId // socketAuthMiddleware tarafından eklenir
                );
                // Kullanıcı doğrulanmışsa userSockets'e ekle
                if (socket.userId) {
                    userSockets[socket.userId] = socket.id;
                    logger.info(
                        `User ${socket.userId} mapped to socket ${socket.id}`
                    );
                }

                // Socket bağlantısı kesildiğinde dinle
                socket.on("disconnect", () => {
                    logger.info(
                        "Bir kullanıcı ayrıldı",
                        socket.id,
                        "User ID:",
                        socket.userId
                    );
                    // Eğer kullanıcı userSockets'te kayıtlıysa ve ID'si eşleşiyorsa kaldır
                    if (
                        socket.userId &&
                        userSockets[socket.userId] === socket.id
                    ) {
                        delete userSockets[socket.userId];
                        logger.info(
                            `Mapping removed for user ${socket.userId}`
                        );
                    }
                });
            });

            // Bildirim servisini baslat ve io ile userSockets'i ilet
            initializeNotificationService(io, userSockets);
            logger.info("✅ Bildirim servisi yuklendi");

            // API rotalarını tanımla
            app.use("/api", routes);
            logger.info("✅ Rotalar yuklendi");

            // Merkezi hata yönetimi middleware'ini tanımla
            app.use(errorHandler);
            logger.info("✅ Hata yonetimi yuklendi");

            // Başlatma başarılıysa ilgili nesneleri döndür
            return { app, server, io };
        } catch (error) {
            logger.error("❌ Sunucu baslatilamadi", error);
            process.exit(1); // Başlatma hatasında uygulamayı sonlandır
        }
    })();
    return initPromise;
}

export default app;
