/**
 * @fileoverview Giris icin kullanilan tokenleri dogrulayan, temizleyen ve HTTP-only cookie olarak ekleyen yardımcı fonksiyonlar.
 * @module utils/authHelper
 */

import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import dotenv from "dotenv";
import logger from "./logger.js";
import crypto from "crypto";
dotenv.config();

/**
 * Istek (request) icindeki 'access_token' cookie'sini kullanarak kullaniciyi dogrular.
 * Cookie yoksa, token yoksa, token gecersizse veya token icindeki kullanıcı bulunamazsa null doner.
 * @param {object} req - Express request nesnesi. Cookie'leri icermesi beklenir.
 * @returns {Promise<object|null>} Dogrulama basarili olursa bulunan kullanici nesnesini, aksi takdirde null doner.
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
 * @returns {void} Bu fonksiyon dogrudan bir deger donmez, response nesnesini modifiye eder.
 */
export const setAuthCookies = (res, accessToken, refreshToken, csrfToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 120, // 2 saat suresi var
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 gunluk suresi var
    });
    res.cookie("csrf_token", csrfToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });
};

/**
 * Response uzerindeki 'access_token' ve 'refresh_token' cookie'lerini temizler.
 * @param {object} res - Express response nesnesi. Cookie'ler bu nesneden silinecektir.
 * @returns {void} Bu fonksiyon dogrudan bir deger donmez, response nesnesini modifiye eder.
 */
export const clearAuthCookies = (res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    };
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    res.clearCookie("csrf_token", cookieOptions);
};

export const generateCSRFToken = () => {
    return crypto.randomBytes(32).toString("hex");
};
