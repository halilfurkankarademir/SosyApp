/**
 * Socket.IO bağlantıları için kimlik doğrulama middleware'i.
 */

import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
import cookie from "cookie";
import logger from "../utils/logger.js";

/**
 * Gelen Socket.IO bağlantılarını cookie'deki access token ile doğrular.
 * Başarılı olursa kullanıcı bilgisini (`user`, `userId`) socket nesnesine ekler.
 */
export async function socketAuthMiddleware(socket, next) {
    try {
        // Socketten gelen header bilgilerini al
        const cookieHeaderString = socket.request.headers.cookie;

        if (!cookieHeaderString) {
            logger.warn("Cookie başlığı bulunamadı.");
            return next(new Error("Kimlik bilgisi (cookie) bulunamadı"));
        }

        // Cookie kutuphanesi ile cookileri ayristir
        const cookies = cookie.parse(cookieHeaderString);

        // Cookilerden access token'i al
        const token = cookies.access_token;

        if (!token) {
            logger.warn("Access token cookie içinde bulunamadı.");
            return next(new Error("Access token bulunamadı"));
        }

        // verifyUserFromTokenCookie'ye uygun sahte request objesi oluştur
        const pseudoReq = {
            cookies: {
                access_token: token,
            },
        };

        // Token'ı doğrula ve kullanıcı bilgisini al
        const user = await verifyUserFromTokenCookie(pseudoReq);

        if (!user) {
            logger.warn("Geçersiz veya Süresi Dolmuş Token");
            return next(new Error("Geçersiz veya Süresi Dolmuş Token"));
        }

        // Kullanıcı bilgisini socket nesnesine ekle
        socket.user = user;
        socket.userId = user.uid;

        logger.info(`Socket ${socket.id} bağlandı`);
        // Başarılı doğrulama, sonraki adıma geç
        next();
    } catch (error) {
        logger.error("Error authenticating socket:", error);
        // Hata durumunda bağlantıyı reddet
        next(new Error("Kimlik doğrulama sırasında bir hata oluştu."));
    }
}
