/**
 *  Kullanıcı kimlik doğrulamasını (kayıt, giriş, çıkış, token yenileme) yöneten Express controller'ları.
 */

import diContainer from "../config/dependencyInjection.js";
import { getAnonymizedClientIpAdress } from "../utils/helpers.js";
import {
    clearAuthCookies,
    generateCSRFToken,
    setAuthCookies,
    setCSRFTokenCookie,
} from "../utils/authHelper.js";
import logger from "../utils/logger.js";

const { authService } = diContainer;

/**
 * Kullanıcı kimlik doğrulama işlemleri için controller fonksiyonlarını içerir.
 */
const authController = {
    /**
     * Yeni kullanıcı kaydı oluşturur ve JWT token'ları üretir.
     */
    register: async (req, res, next) => {
        try {
            const { email, password, username, firstName, lastName } = req.body;

            logger.info(`Registering user with email: ${email}`);

            const ipAddress = getAnonymizedClientIpAdress(req);

            const { user, accessToken, refreshToken } =
                await authService.register(
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                    ipAddress
                );

            setAuthCookies(res, accessToken, refreshToken);

            logger.info("User registered successfully");

            res.status(201).json({
                message: "User registered successfully",
                user,
            });
        } catch (error) {
            logger.error("Error registering user:", error);
            next(error);
        }
    },

    /**
     * Kullanıcının giriş yapmasını sağlar, token üretir ve cookie'lere kaydeder.
     */
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            logger.info(`Logging in user with email: ${email}`);

            const { user, accessToken, refreshToken } = await authService.login(
                email,
                password
            );

            setAuthCookies(res, accessToken, refreshToken);

            logger.info("Login successful");

            res.status(200).json({
                message: "Login successful",
                user,
            });
        } catch (error) {
            logger.error("Error in authController.login:", error);
            next(error);
        }
    },

    /**
     * Kullanıcıyı çıkış yaptırır, oturum cookie'lerini temizler.
     */
    logout: async (req, res, next) => {
        try {
            logger.info("Logging out...");

            clearAuthCookies(res);

            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            logger.error("Error in authController.logout:", error);
            next(error);
        }
    },

    /**
     * Refresh token ile yeni access ve refresh token oluşturur.
     */
    refreshToken: async (req, res, next) => {
        try {
            logger.info("Refreshing token...");

            const token = req.cookies.refresh_token;

            const { accessToken, refreshToken } =
                await authService.refreshToken(token);

            setAuthCookies(res, accessToken, refreshToken);

            logger.info("Token refreshed successfully");

            res.status(200).json({ message: "Token refreshed successfully" });
        } catch (error) {
            logger.error("Error refreshing token:", error);
            next(error);
        }
    },

    /**
     * Yeni bir CSRF token üretir ve yanıtla birlikte döner.
     */
    getCSRFToken: (req, res, next) => {
        try {
            logger.info("Getting CSRF token...");

            const csrfToken = generateCSRFToken();

            setCSRFTokenCookie(res, csrfToken);

            res.status(200).json({ csrfToken });
        } catch (error) {
            logger.error("Error getting CSRF token:", error);
            next(error);
        }
    },
};

export default authController;
