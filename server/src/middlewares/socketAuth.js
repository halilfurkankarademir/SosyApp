/**
 * @fileoverview Socket.IO bağlantıları için kimlik doğrulama middleware'i.
 * @module middlewares/socketAuthMiddleware
 */

import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
import cookie from "cookie";

/**
 * Gelen Socket.IO bağlantılarını cookie'deki access token ile doğrular.
 * Başarılı olursa kullanıcı bilgisini (`user`, `userId`) socket nesnesine ekler.
 * @param {object} socket - Socket.IO socket nesnesi.
 * @param {function} next - Sonraki middleware'e geçmek veya hata iletmek için kullanılan fonksiyon.
 */
export async function socketAuthMiddleware(socket, next) {
    try {
        // Socketten gelen header bilgilerini al
        const cookieHeaderString = socket.request.headers.cookie;

        if (!cookieHeaderString) {
            console.log("Cookie başlığı bulunamadı.");
            return next(new Error("Kimlik bilgisi (cookie) bulunamadı"));
        }

        // Cookie kutuphanesi ile cookileri ayristir
        const cookies = cookie.parse(cookieHeaderString);

        // Cookilerden access token'i al
        const token = cookies.access_token;

        if (!token) {
            console.log("Access token cookie içinde bulunamadı.");
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
            console.warn(
                `Socket ${socket.id} için geçersiz token veya kullanıcı bulunamadı.`
            );
            return next(new Error("Geçersiz veya Süresi Dolmuş Token"));
        }

        // Kullanıcı bilgisini socket nesnesine ekle
        socket.user = user;
        socket.userId = user.uid;

        console.log(
            `Socket ${socket.id} için ${user.uid} kullanıcısı doğrulandı.`
        );
        // Başarılı doğrulama, sonraki adıma geç
        next();
    } catch (error) {
        console.error("Socket kimlik doğrulama hatası:", error.message);
        // Hata durumunda bağlantıyı reddet
        next(new Error("Kimlik doğrulama sırasında bir hata oluştu."));
    }
}
