import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
import cookie from "cookie";

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

        // Burada verifyToken formatina uymasi icin bir sahte request olustur ve icine cookiesi yerlestir
        const pseudoReq = {
            cookies: {
                access_token: token,
            },
        };

        // Cookileri dogrula ve eger dogruysa kullanici bilgisini socket'a at
        const user = await verifyUserFromTokenCookie(pseudoReq);

        if (!user) {
            console.warn(
                `Socket ${socket.id} için geçersiz token veya kullanıcı bulunamadı.`
            );
            return next(new Error("Geçersiz veya Süresi Dolmuş Token"));
        }

        socket.user = user;
        socket.userId = user.uid;

        console.log(
            `Socket ${socket.id} için ${user.uid} kullanıcısı doğrulandı.`
        );
        next();
    } catch (error) {
        console.error("Socket kimlik doğrulama hatası:", error.message);
        next(new Error("Kimlik doğrulama sırasında bir hata oluştu."));
    }
}
