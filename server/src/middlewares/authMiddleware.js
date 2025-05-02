/**
 * @fileoverview HTTP istekleri için kimlik doğrulama middleware'i.
 * @module middlewares/authMiddleware
 */

import dotenv from "dotenv";
import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
import logger from "../utils/logger.js";
dotenv.config();

/**
 * HTTP isteklerini cookie'deki access token ile doğrular.
 * Başarılı olursa kullanıcı bilgisini (`user`) istek nesnesine (`req`) ekler ve sonraki middleware'e geçer.
 * Başarısız olursa 401 Unauthorized yanıtı döner.
 * @param {object} req - Express istek nesnesi (içinde `cookies` beklenir).
 * @param {object} res - Express yanıt nesnesi.
 * @param {function} next - Sonraki middleware fonksiyonu.
 */
export const authenticateToken = async (req, res, next) => {
    try {
        // Cookie'deki token'ı doğrula ve kullanıcıyı al
        const user = await verifyUserFromTokenCookie(req);

        // Kullanıcı bulunamazsa veya token geçersizse 401 hatası dön
        if (!user) {
            return res
                .status(401)
                .json({ error: "Geçersiz veya Süresi Dolmuş Token" });
        }

        // Kullanıcı bilgisini isteğe ekle
        req.user = user;
        // Sonraki middleware'e geç
        next();
    } catch (error) {
        // Doğrulama sırasında bir hata oluşursa logla ve 401 dön
        logger.error("Error authenticating token:", error);
        return res.status(401).json({ error: "Kimlik doğrulama başarısız." }); // Daha genel mesaj
    }
};
