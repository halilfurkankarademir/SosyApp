/**
 * @fileoverview Veritabanı bağlantısını başlatan ve Sequelize modellerini senkronize eden fonksiyonu içerir.
 * @module config/initializeDatabase
 */

import sequelize from "./sequelize.js";

import "../models/userModel.js";
import "../models/postModel.js";
import "../models/likeModel.js";
import "../models/followModel.js";

import logger from "../utils/logger.js";
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
