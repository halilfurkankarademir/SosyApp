/**
 * @fileoverview Veritabanı bağlantısını başlatan ve Sequelize modellerini senkronize eden fonksiyonu içerir.
 * @module config/initializeDatabase
 */

import sequelize from "./sequelize.js";
import "../models/userModel.js";
import "../models/postModel.js";
import "../models/likeModel.js";
import "../models/followModel.js";

import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

/**
 * Sequelize kullanarak veritabanı bağlantısını doğrular ve tanımlı modelleri veritabanı ile senkronize eder.
 * Üretim ortamında `alter: false` kullanılırken, geliştirme ortamında `alter: true` ile tabloları günceller.
 * @async
 * @function initializeDatabase
 * @returns {Promise<Sequelize>} Başarılı olursa Sequelize instance'ını döndürür.
 * @throws {Error} Bağlantı veya senkronizasyon sırasında bir hata oluşursa fırlatır.
 */
export async function initializeDatabase() {
    try {
        // Veritabanı bağlantısını kontrol et
        console.log("Veritabanı bağlantısı doğrulanıyor...");
        await sequelize.authenticate();
        console.log("Veritabanı bağlantısı başarılı!");

        // Tabloları senkronize et
        console.log("Veritabanı tabloları senkronize ediliyor...");

        // Geliştirme ortamında alter: true ile mevcut tablolarda değişiklik yap,
        // üretimde alter: false ile veri kaybını önle (sadece yeni tablolar oluşturulur).
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

        if (error.name) {
            console.error(`Hata tipi: ${error.name}`);
        }
        if (error.original) {
            console.error(
                `Altta yatan hata: ${error.original.message || error.original}`
            );
        }

        throw error;
    }
}
