/**
 * @fileoverview Express uygulaması için merkezi hata yönetimi middleware'i.
 * @module middlewares/errorHandler
 */

import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

/**
 * Express route'larında oluşan hataları yakalar ve istemciye uygun bir yanıt döner.
 * Üretim ortamında detaylı hata mesajlarını gizler.
 * @param {Error} err - Oluşan hata nesnesi.
 * @param {object} req - Express istek nesnesi.
 * @param {object} res - Express yanıt nesnesi.
 * @param {function} next - Sonraki middleware fonksiyonu (bu middleware'de genellikle kullanılmaz).
 */
export default function errorHandler(err, req, res, next) {
    // Hatanın stack trace'ini veya mesajını sunucu loglarına yazdır
    logger.error(err.stack || err.message);

    // Hatanın durum kodunu veya varsayılan olarak 500'ü kullan
    const statusCode = err.status || 500;
    // Üretim ortamındaysa genel bir mesaj, değilse hatanın kendi mesajını kullan
    const message =
        isProduction && statusCode === 500
            ? "Sunucuda bir hata oluştu."
            : err.message || "Bilinmeyen bir hata oluştu.";

    // İstemciye JSON formatında hata mesajı gönder
    res.status(statusCode).json({ error: message });
}
