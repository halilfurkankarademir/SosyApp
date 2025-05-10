/**
 * Express uygulaması için merkezi hata yönetimi middleware'i.
 */

import logger from "../utils/logger.js";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Express route'larında oluşan hataları yakalar ve istemciye uygun bir yanıt döner.
 * Üretim ortamında detaylı hata mesajlarını gizler.
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

    res.status(statusCode).json({ message });
}
