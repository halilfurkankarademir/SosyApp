import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import sequelize from "./config/sequelize.js";
import setupAssociations from "./models/associations.js";

// Uygulama için express'i başlat
const app = express();
const port = process.env.PORT || 3000;

// env degiskenleri icin dotenv cfg
dotenv.config({ debug: true });

//PostgreSQL Bağlantısını test et
async function testPostreSQLConnection() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL bağlantısı başarılı!");
        await sequelize.sync();
        console.log("Veritabanı senkronize edildi!");
    } catch (error) {
        console.error("PostgreSQL bağlantı hatası:", error);
    }
}

testPostreSQLConnection();

// Model ilişkilerini ayarla
setupAssociations();

// CORS ayarları
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// JSON parser middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Server'ı başlat
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor`);
});
