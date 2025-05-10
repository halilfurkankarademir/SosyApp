/**
 *  Veritabanı bağlantısı ve modelleri tanımlayan modül.
 */

import sequelize from "./sequelize.js";

import "../models/userModel.js";
import "../models/postModel.js";
import "../models/likeModel.js";
import "../models/followModel.js";

import logger from "../utils/logger.js";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Sequelize kullanarak veritabanı bağlantısını doğrular ve tanımlı modelleri veritabanı ile senkronize eder.
 * Üretim ortamında `alter: false` kullanılırken, geliştirme ortamında `alter: true` ile tabloları günceller.
 */
export async function initializeDatabase() {
    try {
        // Veritabanı bağlantısını kontrol et
        logger.info("Veritabanı bağlantısı kontrol ediliyor...");
        await sequelize.authenticate();
        logger.info("Veritabanı bağlantısı başarılı!");

        // Tabloları senkronize et
        logger.info("Veritabanı tabloları senkronize ediliyor...");

        // Geliştirme ortamında alter: true ile mevcut tablolarda değişiklik yap,
        // üretimde alter: false ile veri kaybını önle (sadece yeni tablolar oluşturulur).
        await sequelize.sync({
            alter: isProduction ? false : true,
        });

        logger.info("Veritabanı tabloları başarıyla senkronize edildi!");
        return sequelize;
    } catch (error) {
        logger.error(
            "Veritabanı bağlantı/senkronizasyon hatası:",
            error.message
        );
        throw error;
    }
}
