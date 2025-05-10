/**
 * ullanici kimlik dogrulama ve oturum yonetimi route'lari.
 */

import express from "express";
import authController from "../controllers/authController.js";
import {
    validateLogin,
    validateRegister,
} from "../middlewares/validators/authValidator.js";
import mailController from "../controllers/mailController.js";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Email /şifre ile giriş yapar, token döner. `validateLogin` kullanılır.
 */
router.post("/login", validateLogin, authController.login);

/**
 * Yeni kullanıcı kaydı.
 */
router.post("/register", validateRegister, authController.register);

/**
 * Kullanıcı çıkışı.
 */
router.post("/logout", authController.logout);

/**
 * Erişim token'ını yenileme.
 */
router.post("/refresh", authController.refreshToken);

/**
 * E-posta adresine dogrulama linki gonderir.
 */
router.post(
    "/send-verification-email",
    authenticateToken,
    verifyCSRF,
    mailController.sendVerificationMail
);

/**
 * E-posta adresine dogrulama linki gonderir.
 */
router.post(
    "/verify-user-with-otp",
    authenticateToken,
    verifyCSRF,
    mailController.verifyUserWithOTP
);

/**
 * Erişim token'ını yenileme.
 * @route {get} /auth/csrf-token
 * @description Bir csrf token alır.
 * @returns {void} Başarılı olursa `200 OK` ile yeni erişim token'ı, hata durumunda ilgili status kodları (401, 403, 500).
 */
router.get("/csrf-token", authenticateToken, authController.getCSRFToken);

export default router;
