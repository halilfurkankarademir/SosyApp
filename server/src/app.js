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

// 1. Uygulama ve temel konfigürasyon
dotenv.config();
/**
 * Express uygulama örneği.
 * @type {express.Application}
 */
const app = express();

/**
 * Node.js HTTP sunucusu. Express uygulamasını sarmalar.
 * @type {http.Server}
 */
const server = http.createServer(app);

/**
 * Socket.IO sunucu örneği. Gerçek zamanlı iletişim için kullanılır.
 * @type {Server}
 */
const io = new Server(server, {
    cors: corsConfig,
});

/**
 * Aktif kullanıcıların socket ID'lerini kullanıcı ID'leriyle eşleştiren nesne.
 * Bildirim göndermek için kullanılır.
 * @type {Object.<string, string>}
 */
const userSockets = {};

/**
 * Swagger API dokümantasyon verisi.
 * @type {object}
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
 * @type {Promise<{app: express.Application, server: http.Server, io: Server}> | null}
 */
let initPromise = null;

/**
 * Sunucuyu asenkron olarak başlatır. Veritabanı bağlantısını kurar,
 * model ilişkilerini ayarlar, Socket.IO'yu yapılandırır, servisleri başlatır,
 * rotaları yükler ve hata yönetimini ayarlar.
 * Sunucunun sadece bir kez başlatılmasını sağlar.
 * @async
 * @function initializeServer
 * @returns {Promise<{app: express.Application, server: http.Server, io: Server}>} Başlatılan Express uygulaması, HTTP sunucusu ve Socket.IO örneğini içeren bir nesne döndürür.
 * @throws {Error} Başlatma sırasında bir hata oluşursa programı sonlandırır.
 */
export async function initializeServer() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
        try {
            console.log("Server baslatiliyor...");
            // Veritabanı bağlantısı ve modelleri senkronize et
            await initializeDatabase();
            // Modeller arasındaki iliskileri ayarla
            setupAssociations();
            console.log("✅ Veritabanı ve modeller yuklendi");

            // Socket token kimlik dogrulama middleware aktivasyonu
            io.use(socketAuthMiddleware);
            console.log("✅ Socket kimlik dogrulama middleware aktif");

            // Yeni socket bağlantılarını dinle
            io.on("connection", (socket) => {
                console.log(
                    "Bir kullanıcı bağlandı",
                    socket.id,
                    "User ID:",
                    socket.userId // socketAuthMiddleware tarafından eklenir
                );
                // Kullanıcı doğrulanmışsa userSockets'e ekle
                if (socket.userId) {
                    userSockets[socket.userId] = socket.id;
                    console.log(
                        `User ${socket.userId} mapped to socket ${socket.id}`
                    );
                }

                // Socket bağlantısı kesildiğinde dinle
                socket.on("disconnect", () => {
                    console.log(
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
                        console.log(
                            `Mapping removed for user ${socket.userId}`
                        );
                    }
                });
            });

            // Bildirim servisini baslat ve io ile userSockets'i ilet
            initializeNotificationService(io, userSockets);
            console.log("✅ Bildirim servisi yuklendi");

            // API rotalarını tanımla
            app.use("/api", routes);
            console.log("✅ Rotalar yuklendi");

            // Merkezi hata yönetimi middleware'ini tanımla
            app.use(errorHandler);
            console.log("✅ Hata yonetimi yuklendi");

            // Başlatma başarılıysa ilgili nesneleri döndür
            return { app, server, io };
        } catch (error) {
            console.error("❌ Sunucu baslatilamadi", error);
            process.exit(1); // Başlatma hatasında uygulamayı sonlandır
        }
    })();
    return initPromise;
}

export default app;
