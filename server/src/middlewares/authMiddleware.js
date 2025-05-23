/**
 * HTTP istekleri için kimlik doğrulama middleware'i.
 */

import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
import logger from "../utils/logger.js";

/**
 * HTTP isteklerini cookie'deki access token ile doğrular.
 * Başarılı olursa kullanıcı bilgisini (`user`) istek nesnesine (`req`) ekler ve sonraki middleware'e geçer.
 * Başarısız olursa 401 Unauthorized yanıtı döner.
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
        return res.status(401).json({ error: "Kimlik doğrulama başarısız." });
    }
};

/**
 * CSRF tokenleri alip esit olmasi durumunda onay veren aksi durumda ret veren middleware.
 * CSRF token gelmişse 403 Forbidden yanıtı döner.
 */
export const verifyCSRF = (req, res, next) => {
    const isProd = process.env.NODE_ENV === "production";
    // Eger geliştirme modunda ise csrf token doğrulamayı atla RISKLI   !
    if (!isProd) {
        logger.warn(
            "⚠️ ⚠️ ⚠️ CSRF token verification skipped in development mode. ⚠️ ⚠️ ⚠️"
        );
        return next();
    }

    console.log("Verifying CSRF token...");
    const csrfFromCookie = req.cookies.csrf_token;
    console.log("CSRF token from cookie:", csrfFromCookie);
    const csrfFromHeaders = req.headers["x-csrf-token"];

    if (csrfFromHeaders && csrfFromHeaders.includes("expires=")) {
        console.log("Expires found in headers");
        csrfFromHeaders = csrfFromHeaders.split(" ")[0];
    }

    console.log("CSRF token from headers:", csrfFromHeaders);
    const isMatch = csrfFromCookie === csrfFromHeaders;
    console.log("CSRF tokens match:", isMatch);
    if (!csrfFromCookie || !csrfFromHeaders || !isMatch)
        return res.status(403).json({ error: "CSRF token not found." });
    console.log("CSRF token verified");
    next();
};

/**
 * Istegi yapan kullanıcının admin olup olmadıgını kontrol eden middleware.
 */
export const checkAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied." });
    }
    next();
};
