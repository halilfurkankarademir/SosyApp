import { verifyUserFromTokenCookie } from "../utils/authHelper.js";

export async function socketAuthMiddleware(socket, next) {
    try {
        const cookieHeader = socket.request.headers.cookie;

        if (!cookieHeader) {
            return next(new Error("Kimlik bilgisi (cookie) bulunamadı"));
        }

        const user = await verifyUserFromTokenCookie(cookieHeader);

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
