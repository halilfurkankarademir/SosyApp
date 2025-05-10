/**
 * JWT token olusturma ve dogrulama islemlerini yoneten modul.
 */

import jwt from "jsonwebtoken";
import { ErrorMessages } from "./constants.js";
import createHttpError from "http-errors";

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
     */
    generateTokens: (userId) => {
        if (!userId) {
            throw createHttpError(401, ErrorMessages.USERS_NOT_FOUND);
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
     */
    verifyAccessToken: (token) => {
        if (!token) {
            throw createHttpError(401, ErrorMessages.ACCESS_TOKEN_NEEDED);
        }
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    },

    /**
     * Refresh token'ı doğrular ve payload'ını döndürür.
     * @param {string} token - Doğrulanacak refresh token.
     * @returns {object | string} Token geçerliyse çözülmüş payload'ı (genellikle { userId: string, iat: number, exp: number } içeren bir nesne).
     */
    verifyRefreshToken: (token) => {
        if (!token) {
            throw createHttpError(401, ErrorMessages.REFRESH_TOKEN_NEEDED);
        }
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    },
};

export default jwtUtils;
