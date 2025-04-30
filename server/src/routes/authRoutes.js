/**
 * @fileoverview Kullanici kimlik dogrulama ve oturum yonetimi route'lari.
 * @module routes/authRoutes
 */

import express from "express";
import authController from "../controllers/authController.js";
import {
    validateLogin,
    validateRegister,
} from "../middlewares/validators/authValidator.js";

const router = express.Router();

/**
 * Kullanıcı girişi.
 * @route {POST} /auth/login
 * @description Kullanıcı adı/şifre ile giriş yapar, token döner. `validateLogin` kullanılır.
 * @param {object} req.body - `{ username, password }`
 * @returns {void} Başarılı olursa `200 OK` ile token ve kullanıcı bilgisi, hata durumunda ilgili status kodları (400, 401, 500).
 */
router.post("/login", validateLogin, authController.login);

/**
 * Yeni kullanıcı kaydı.
 * @route {POST} /auth/register
 * @description Yeni kullanıcı hesabı oluşturur. `validateRegister` kullanılır.
 * @param {object} req.body - `{ username, email, password }`
 * @returns {void} Başarılı olursa `201 Created` ile kullanıcı bilgisi, hata durumunda ilgili status kodları (400, 409, 500).
 */
router.post("/register", validateRegister, authController.register);

/**
 * Kullanıcı çıkışı.
 * @route {POST} /auth/logout
 * @description Oturumu sonlandırır (örn: refresh token'ı geçersiz kılar).
 * @returns {void} Başarılı olursa `204 No Content` veya `200 OK`, hata durumunda ilgili status kodları (401, 500).
 */
router.post("/logout", authController.logout);

/**
 * Erişim token'ını yenileme.
 * @route {POST} /auth/refresh
 * @description Geçerli refresh token ile yeni erişim token'ı alır.
 * @returns {void} Başarılı olursa `200 OK` ile yeni erişim token'ı, hata durumunda ilgili status kodları (401, 403, 500).
 */
router.post("/refresh", authController.refreshToken);

export default router;
