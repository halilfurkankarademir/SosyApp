import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import dotenv from "dotenv";

dotenv.config();

// Kimlik dogrulama fonksiyonu
export async function verifyUserFromTokenCookie(req) {
    try {
        if (!req.cookies) {
            console.log("Cookies not found in request");
            return null;
        }
        const token = req.cookies.access_token;
        if (!token) {
            console.log("Access token not found in cookies");
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await userRepository.findUser({
            where: { uid: decoded.userId },
        });

        if (!user) {
            console.log("User not found");
            return null;
        }

        return user;
    } catch (error) {
        console.error("!!! ERROR in verifyUserFromTokenCookie !!!");
        console.error("Error Name:", error.name); // Hatanın türünü gösterir (örn: TokenExpiredError)
        console.error("Error Message:", error.message); // Hatanın detayını gösterir
        console.error("Full Error Object:", error);

        return null;
    }
}

// Response icin http only cookileri ayarlayan fonksiyon
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 15, // 15 dakika suresi var
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gunluk suresi var
    });
};

// Cookileri temizleyen fonksiyon
export const clearAuthCookies = (res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
};
