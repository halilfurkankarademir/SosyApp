import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
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
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Socket io kurulumu
const io = new Server(server, {
    cors: corsConfig,
});

// Kullanicilarin socketlerini tutan obje
const userSockets = {};

// Swagger dosyasisini oku
const swaggerDocument = JSON.parse(
    await readFile(new URL("../swagger-output.json", import.meta.url))
);

// 2. Middleware'ler (sıralama önemli)
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors(corsConfig));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rate limit middleware
// app.use("/api/auth/login", authLimiter);
// app.use("/api/auth/register", authLimiter);

async function startServer() {
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

        io.on("connection", (socket) => {
            console.log(
                "Bir kullanıcı bağlandı",
                socket.id,
                "User ID:",
                socket.userId
            );
            if (socket.userId) {
                userSockets[socket.userId] = socket.id;
                console.log(
                    `User ${socket.userId} mapped to socket ${socket.id}`
                );
            }

            socket.on("disconnect", () => {
                console.log(
                    "Bir kullanıcı ayrıldı",
                    socket.id,
                    "User ID:",
                    socket.userId
                );
                if (socket.userId && userSockets[socket.userId] === socket.id) {
                    delete userSockets[socket.userId];
                    console.log(`Mapping removed for user ${socket.userId}`);
                }
            });
        });

        // Bildirim servisini baslat
        initializeNotificationService(io, userSockets);
        console.log("✅ Bildirim servisi yuklendi");

        // Rota tanımları
        app.use("/api", routes);
        console.log("✅ Rotalar yuklendi");

        // Hata yönetimi
        app.use(errorHandler);
        console.log("✅ Hata yonetimi yuklendi");

        // Sunucuyu baslat
        server.listen(port, () => {
            console.log(`Server ${port} portunda çalışıyor`);
        });

        // Graceful shutdown için
        process.on("SIGTERM", () => {
            console.log("SIGTERM alındı. Sunucu kapatılıyor...");
            server.close(() => {
                console.log("Sunucu kapatıldı");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("❌ Sunucu baslatilamadi", error);
        process.exit(1);
    }
}

startServer();
