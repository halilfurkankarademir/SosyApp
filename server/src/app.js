import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { Server } from "socket.io";
import { initializeDatabase } from "./config/database.js";
import setupAssociations from "./models/associations.js";

import "./models/userModel.js";
import "./models/postModel.js";
import "./models/likeModel.js";
import "./models/followModel.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import { verifyUserFromTokenCookie } from "./utils/authHelper.js";
import { initializeNotificationService } from "./services/notificationService.js";

// Kullanicilarin socketlerini tutan obje
const userSockets = {};

// 1. Uygulama ve temel konfigürasyon
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware'ler (sıralama önemli)
app.set("trust proxy", 1); // Proxy ayarı en üste
app.use(express.json()); // JSON parser
app.use(
    cors({
        origin: "http://localhost:5173", // Client URL'niz
        credentials: true,
        exposedHeaders: ["Set-Cookie"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// Http server
const server = http.createServer(app);

// Socket io kurulumu
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

// 3. Rate Limit konfigürasyonları
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
});

// Rate limit middleware
// app.use(apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 4. Veritabanı ve bildirim kurulumu bağlantısı ve sunucu başlatma
initializeDatabase()
    .then(() => {
        setupAssociations();
        startServer();
    })
    .catch((error) => {
        console.error("Uygulama başlatma hatası:", error);
        process.exit(1);
    });

initializeNotificationService(io, userSockets);

// 5. Route'lar
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/saved", savedRoutes);

// 6. Hata yönetimi (en sonda olmalı)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// 7. Sunucu yönetim fonksiyonları
function startServer() {
    server.listen(port, () => {
        console.log(`Server ${port} portunda çalışıyor`);
    });

    io.use(async (socket, next) => {
        try {
            const cookieHeader = socket.request.headers.cookie;
            const user = await verifyUserFromTokenCookie(cookieHeader);

            if (!user) {
                return next(new Error("Geçersiz veya Süresi Dolmuş Token"));
            }

            socket.user = user;
            socket.userId = user.uid;

            console.log(
                `Socket ${socket.id} icin ${user.uid} kullanıcısı bağlandı`
            );

            next();
        } catch (error) {
            next(error);
        }
    });

    io.on("connection", (socket) => {
        console.log(
            "Bir kullanıcı bağlandı",
            socket.id,
            "User ID:",
            socket.userId
        ); // userId'yi de loglamak faydalı olabilir
        if (socket.userId) {
            // userSockets[socket.userId] = socket; // <-- Mevcut (iyileştirilebilir)
            userSockets[socket.userId] = socket.id; // <-- İyileştirme: Sadece ID'yi sakla
            console.log(`User ${socket.userId} mapped to socket ${socket.id}`);
        }

        socket.on("disconnect", () => {
            console.log(
                "Bir kullanıcı ayrıldı",
                socket.id,
                "User ID:",
                socket.userId
            );
            // *** TEMİZLEME EKLE ***
            if (socket.userId && userSockets[socket.userId] === socket.id) {
                delete userSockets[socket.userId];
                console.log(`Mapping removed for user ${socket.userId}`);
            }
            // *** TEMİZLEME SONU ***
        });
    });

    // Graceful shutdown için
    process.on("SIGTERM", () => {
        console.log("SIGTERM alındı. Sunucu kapatılıyor...");
        server.close(() => {
            console.log("Sunucu kapatıldı");
            process.exit(0);
        });
    });
}
