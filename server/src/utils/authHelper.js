import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import dotenv from "dotenv";
dotenv.config();

// Cookie header'ından token'ı alan yardımcı fonksiyon
function getAccessTokenFromCookie(cookieHeader) {
    if (!cookieHeader) return null;
    const accessTokenMatch = cookieHeader.match(/access_token=([^;]+)/);
    return accessTokenMatch ? accessTokenMatch[1] : null;
}

// Kimlik dogrulama fonksiyonu
export async function verifyUserFromTokenCookie(cookieHeader) {
    try {
        const token = getAccessTokenFromCookie(cookieHeader);
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_25);
        const user = await userRepository.getByUserId(decoded.userId);

        if (!user) {
            return null;
        }

        // Başarılı olursa kullanıcı nesnesini döndür
        return user;
    } catch (error) {
        console.error("Token verification/User fetch error:", error.message);

        return null;
    }
}
