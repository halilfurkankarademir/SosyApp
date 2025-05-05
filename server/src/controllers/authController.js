/**
 * @fileoverview Kullanıcı kimlik doğrulama işlemlerini (kayıt, giriş, çıkış, token yenileme)
 * yöneten Express controller'ları içerir.
 * @module controllers/authController
 */

import diContainer from "../config/dependencyInjection.js";
import dotenv from "dotenv";
import userDTO from "../dtos/userDTO.js";
import { getAnonymizedIp } from "../utils/helpers.js";
import jwtUtils from "../utils/jwtUtils.js";
import {
    clearAuthCookies,
    generateCSRFToken,
    setAuthCookies,
} from "../utils/authHelper.js";
import logger from "../utils/logger.js";
import { ErrorMessages } from "../utils/constants.js";

dotenv.config();

const { authService } = diContainer;

/**
 * Kimlik doğrulama ile ilgili HTTP isteklerini işleyen controller metotları.
 * @namespace authController
 */
const authController = {
    /**
     * Yeni bir kullanıcı kaydeder.
     * İstek gövdesinden kullanıcı bilgilerini alır, IP adresini anonimleştirir,
     * `authService` kullanarak kullanıcıyı kaydeder, JWT tokenları oluşturur,
     * tokenları cookie'lere ayarlar ve kullanıcı bilgilerini DTO ile döndürür.
     * @async
     * @param {express.Request} req - Express istek nesnesi. req.body {email, password, username, firstName, lastName} içermelidir.
     * @param {express.Response} res - Express yanıt nesnesi.
     * @param {express.NextFunction} next - Bir sonraki middleware fonksiyonu.
     * @returns {Promise<void>} Başarılı olursa 201 durum kodu ve kullanıcı bilgileri ile yanıt gönderir.
     */
    register: async (req, res, next) => {
        try {
            logger.info("Registering user...");

            const { email, password, username, firstName, lastName } = req.body;
            const ipAddress =
                req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            const anonymizedIp = getAnonymizedIp(ipAddress);

            const user = await authService.register(
                email,
                password,
                username,
                firstName,
                lastName,
                anonymizedIp
            );

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            const csrfToken = generateCSRFToken();

            setAuthCookies(res, accessToken, refreshToken, csrfToken);

            const userDTOInstance = new userDTO(user);

            logger.info("User registered successfully");

            res.status(201).json({
                message: "User registered successfully",
                user: userDTOInstance,
            });
        } catch (error) {
            logger.error("Error registering user:", error);
            res.status(500).json({
                error: "Registration failed",
                details: error.message,
            });
            next(error);
        }
    },

    /**
     * Mevcut bir kullanıcının giriş yapmasını sağlar.
     * İstek gövdesinden email ve şifreyi alır, `authService` ile doğrular,
     * JWT tokenları oluşturur, tokenları cookie'lere ayarlar ve kullanıcı bilgilerini DTO ile döndürür.
     * @async
     * @param {express.Request} req - Express istek nesnesi. req.body {email, password} içermelidir.
     * @param {express.Response} res - Express yanıt nesnesi.
     * @param {express.NextFunction} next - Bir sonraki middleware fonksiyonu.
     * @returns {Promise<void>} Başarılı olursa 200 durum kodu ve kullanıcı bilgileri ile yanıt gönderir. Hatalı kimlik bilgisi için 401 döndürür.
     */
    login: async (req, res, next) => {
        try {
            logger.info("Logging in...");

            const { email, password } = req.body;

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: "Email and password are required" });
            }

            const user = await authService.login(email, password);

            if (!user) {
                return res
                    .status(401)
                    .json({ error: ErrorMessages.INVALID_CREDENTIALS });
            }

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            const csrfToken = generateCSRFToken();

            setAuthCookies(res, accessToken, refreshToken, csrfToken);

            const userDTOInstance = new userDTO(user);

            logger.info("Login successful");

            res.status(200).json({
                message: "Login successful",
                user: userDTOInstance,
            });
        } catch (error) {
            logger.error("Error in authController.login:", error);
            res.status(500).json({ error: "Login failed" });
            next(error);
        }
    },

    /**
     * Kullanıcının oturumunu sonlandırır.
     * Kimlik doğrulama ile ilgili cookie'leri temizler.
     * @async
     * @param {express.Request} req - Express istek nesnesi.
     * @param {express.Response} res - Express yanıt nesnesi.
     * @param {express.NextFunction} next - Bir sonraki middleware fonksiyonu.
     * @returns {Promise<void>} Başarılı olursa 200 durum kodu ile yanıt gönderir.
     */
    logout: async (req, res, next) => {
        try {
            logger.info("Logging out...");
            clearAuthCookies(res);
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            logger.error("Error in authController.logout:", error);
            res.status(500).json({ error: "Logout failed" });
            next(error);
        }
    },

    /**
     * Refresh token kullanarak yeni bir access token ve refresh token oluşturur.
     * Cookie'den refresh token'ı alır, `authService` ile doğrular ve yeniler,
     * yeni tokenları cookie'lere ayarlar.
     * @async
     * @param {express.Request} req - Express istek nesnesi. req.cookies.refresh_token içermelidir.
     * @param {express.Response} res - Express yanıt nesnesi.
     * @param {express.NextFunction} next - Bir sonraki middleware fonksiyonu.
     * @returns {Promise<void>} Başarılı olursa 200 durum kodu ile yanıt gönderir. Token geçersiz veya süresi dolmuşsa uygun bir hata durumu döndürmelidir (genellikle authService içinde halledilir ve 401/403 döner).
     */
    refreshToken: async (req, res, next) => {
        try {
            logger.info("Refreshing token...");

            const token = req.cookies.refresh_token;

            // Token yoksa hata döndür
            if (!token) {
                return res
                    .status(401)
                    .json({ error: "Refresh token not found." });
            }

            // AuthService token doğrulama ve kullanıcı bulma işlemini yapar
            const user = await authService.refreshToken(token);

            // Yeni tokenları oluştur
            const { accessToken, refreshToken: newRefreshToken } =
                jwtUtils.generateTokens(user.uid);

            // Yeni tokenları cookie'ye set et
            setAuthCookies(res, accessToken, newRefreshToken);

            logger.info("Token refreshed successfully");

            res.status(200).json({ message: "Token refreshed successfully" });
        } catch (error) {
            logger.error("Error refreshing token:", error);
            res.status(500).json({ error: "Token refresh failed" });
            next(error);
        }
    },
};

export default authController;
