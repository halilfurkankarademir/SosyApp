import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { initializeDatabase } from "./config/database.js";
import setupAssociations from "./models/associations.js";

// Tüm modelleri burada içe aktaralım, böylece sequelize.sync()
// çağrılmadan önce yüklenmiş olurlar
import "./models/userModel.js";
import "./models/postModel.js";
import "./models/likeModel.js";
import "./models/followModel.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js";

// 1. Uygulama ve temel konfigürasyon
const app = express();
dotenv.config();
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
app.use(apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 4. Veritabanı bağlantısı ve sunucu başlatma
initializeDatabase()
    .then(() => {
        setupAssociations();
        startServer();
    })
    .catch((error) => {
        console.error("Uygulama başlatma hatası:", error);
        process.exit(1);
    });

// 5. Route'lar
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

// 6. Hata yönetimi (en sonda olmalı)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// 7. Sunucu yönetim fonksiyonları
function startServer() {
    const server = app.listen(port, () => {
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
}
