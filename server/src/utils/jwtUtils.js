/**
 * @fileoverview JWT token olusturma ve dogrulama islemlerini yoneten modul.
 * @module utils/jwtUtils
 */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorMessages } from "./constants.js";
dotenv.config();

// Gerekli token ayarlamalarini env dosyasindan al
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

const jwtUtils = {
    /**
     * Access ve refresh token uretir.
     * @param {string} userId - Token içine eklenecek kullanıcı ID'si.
     * @returns {{accessToken: string, refreshToken: string}} Access ve refresh token'ları içeren bir nesne.
     * @throws {Error} userId sağlanmazsa hata fırlatır.
     */
    generateTokens: (userId) => {
        if (!userId) {
            throw new Error(ErrorMessages.USER_ID_NEEDED_FOR_TOKENS);
        }
        const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        return { accessToken, refreshToken };
    },

    /**
     * Access token'ı doğrular ve payload'ını döndürür.
     * @param {string} token - Doğrulanacak access token.
     * @returns {object | string} Token geçerliyse çözülmüş payload'ı (genellikle { userId: string, iat: number, exp: number } içeren bir nesne).
     * @throws {JsonWebTokenError | TokenExpiredError | Error} Token geçersizse, süresi dolmuşsa veya token sağlanmazsa hata fırlatır.
     */
    verifyAccessToken: (token) => {
        if (!token) {
            throw new Error(ErrorMessages.ACCESS_TOKEN_NEEDED);
        }
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    },

    /**
     * Refresh token'ı doğrular ve payload'ını döndürür.
     * @param {string} token - Doğrulanacak refresh token.
     * @returns {object | string} Token geçerliyse çözülmüş payload'ı (genellikle { userId: string, iat: number, exp: number } içeren bir nesne).
     * @throws {JsonWebTokenError | TokenExpiredError | Error} Token geçersizse, süresi dolmuşsa veya token sağlanmazsa hata fırlatır.
     */
    verifyRefreshToken: (token) => {
        if (!token) {
            throw new Error(ErrorMessages.REFRESH_TOKEN_NEEDED);
        }
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    },
};

export default jwtUtils;
