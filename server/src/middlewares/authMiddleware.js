import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRepository from "../repositories/userRepository.js";
dotenv.config();

// Token doğrulama middleware
export const authenticateToken = async (req, res, next) => {
    try {
        // Token'ı al (header veya cookie'den)
        const token = getAccessToken(req.headers.cookie);

        if (!token) {
            return res.status(401).json({ error: "Yetkilendirme gerekli" });
        }

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET_25);

        // UID ile Kullanıcıyı bul
        const user = await userRepository.getByUserId(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "Geçersiz token" });
        }

        // Kullanıcı bilgisini request'e ekle
        // Artik bir sonraki middleware'de req.user ile erişebiliriz
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res
            .status(403)
            .json({ error: "Geçersiz veya süresi dolmuş token" });
    }
};

// Tokenleri cookie'den al
function getAccessToken(cookieHeader) {
    if (!cookieHeader) return null;
    const accessTokenMatch = cookieHeader.match(/access_token=([^;]+)/);
    return accessTokenMatch ? accessTokenMatch[1] : null;
}
function getRefreshToken(cookieHeader) {
    const refreshTokenMatch = cookieHeader.match(/refresh_token=([^;]+)/);
    return refreshTokenMatch ? refreshTokenMatch[1] : null;
}
