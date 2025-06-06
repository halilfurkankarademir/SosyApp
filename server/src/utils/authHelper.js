/**
 * Giris icin kullanilan tokenleri dogrulayan, temizleyen ve HTTP-only cookie olarak ekleyen yardımcı fonksiyonlar.
 */

import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import logger from "./logger.js";
import crypto from "crypto";

/**
 * Istek (request) icindeki 'access_token' cookie'sini kullanarak kullaniciyi dogrular.
 * Cookie yoksa, token yoksa, token gecersizse veya token icindeki kullanıcı bulunamazsa null doner.
 */
export async function verifyUserFromTokenCookie(req) {
    try {
        if (!req.cookies) {
            logger.warn("Cookies not found in request");
            return null;
        }
        const token = req.cookies.access_token;
        if (!token) {
            logger.warn("Access token not found in cookies");
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await userRepository.findUser({
            where: { uid: decoded.userId },
        });

        if (!user) {
            logger.warn("User not found in database");
            return null;
        }

        return user;
    } catch (error) {
        logger.error("Error verifying user from token cookie:", error);
        return null;
    }
}

/**
 * Verilen access ve refresh token'ları HTTP-only cookie olarak response'a ekler.
 * Guvenlik icin secure ve sameSite='none' ayarlari kullanilir.
 * @param {string} accessToken - Kullanici icin uretilmis access token.
 * @param {string} refreshToken - Kullanici icin uretilmis refresh token.
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 2, // 2 saat suresi var
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gunluk suresi var
    });
};

/**
 * Verilen CSRF token'ı HTTP-only cookie olarak response'a ekler.
 * @param {object} res - Express response nesnesi. Cookie'ler bu nesneden eklenicektir.
 * @param {string} csrfToken - Kullanici icin uretilmis csrf token.
 */
export const setCSRFTokenCookie = (res, csrfToken) => {
    res.cookie("csrf_token", csrfToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24, // 24 saat
    });
};

/**
 * Response uzerindeki 'access_token' ve 'refresh_token' ve 'csrf_token' cookie'lerini temizler.
 * @param {object} res - Express response nesnesi. Cookie'ler bu nesneden silinecektir.
 */
export const clearAuthCookies = (res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    res.clearCookie("csrf_token", cookieOptions);
};

// CSRF token uretme fonksiyonu 32 haneli rastgele byte dizisi uretir
export const generateCSRFToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

// Mail dogrulama icin kullanilan OTP uretme fonksiyonu 6 haneli rastgele sayi uretir
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
