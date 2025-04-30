import sequelize from "./sequelize.js";
import "../models/userModel.js";
import "../models/postModel.js";
import "../models/likeModel.js";
import "../models/followModel.js";

import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// Bu fonksiyon, veritabanı bağlantısını başlatır ve modelleri senkronize eder
export async function initializeDatabase() {
    try {
        // Veritabanı bağlantısını kontrol et
        console.log("Veritabanı bağlantısı doğrulanıyor...");
        await sequelize.authenticate();
        console.log("Veritabanı bağlantısı başarılı!");

        // Tabloları senkronize et
        console.log("Veritabanı tabloları senkronize ediliyor...");

        await sequelize.sync({
            alter: isProduction ? false : true,
        });

        console.log("Veritabanı tabloları başarıyla senkronize edildi!");
        return sequelize;
    } catch (error) {
        console.error(
            "Veritabanı bağlantı/senkronizasyon hatası:",
            error.message
        );

        // Hata detaylarını göster
        if (error.name) {
            console.error(`Hata tipi: ${error.name}`);
        }
        if (error.parent) {
            console.error(`Altta yatan hata: ${error.parent.message}`);
        }

        throw error;
    }
}
