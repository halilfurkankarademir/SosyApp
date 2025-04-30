/**
 * @fileoverview Kullanici profili ve bilgileriyle ilgili route'ları tanimlar.
 * @module routes/userRoutes
 */

import express from "express";
import userController from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    validateEmail,
    validateUsername,
    validateUserId,
} from "../middlewares/validators/userValidator.js";

const router = express.Router();

/**
 * Oturum açmış aktif kullanıcıyı getirir.
 * @route {GET} /users/me
 * @description Aktif kullanıcının bilgilerini döndürür. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı objesi, hata durumunda (401, 404, 500).
 */
router.get("/me", authenticateToken, userController.getCurrentUser);

/**
 * Belirli bir kullanıcıyı ID ile getirir.
 * @route {GET} /users/id/:userId
 * @description ID'si verilen kullanıcının bilgilerini döndürür. Kimlik doğrulama gerektirir. (`validateUserId` eklenebilir).
 * @param {string} req.params.userId - Bilgileri alınacak kullanıcının ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı objesi, hata durumunda (400, 401, 404, 500).
 */
// Belki validateUserId eklenmeli
router.get(
    "/id/:userId",
    validateUserId,
    authenticateToken,
    userController.getUserById
);

/**
 * Kullanıcı profilini kullanıcı adı ile getirir.
 * @route {GET} /users/username/:username
 * @description Kullanıcı adı verilen kullanıcının profil detaylarını getirir. Kimlik doğrulama ve `username` doğrulaması gerektirir.
 * @param {string} req.params.username - Profili alınacak kullanıcının adı.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı profil objesi, hata durumunda (400, 401, 404, 500).
 */
router.get(
    "/username/:username",
    validateUsername,
    authenticateToken,
    userController.getUserProfileDetails
);

/**
 * Belirli bir kullanıcıyı e-posta adresi ile getirir.
 * @route {GET} /users/email/:email
 * @description E-posta adresi verilen kullanıcının bilgilerini döndürür. Kimlik doğrulama ve `email` doğrulaması gerektirir.
 * @param {string} req.params.email - Bilgileri alınacak kullanıcının e-posta adresi.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı objesi, hata durumunda (400, 401, 404, 500).
 */
router.get(
    "/email/:email",
    validateEmail,
    authenticateToken,
    userController.getUserByEmail
);

/**
 * Tüm kullanıcıları listeler (Admin yetkisi gerekebilir).
 * @route {GET} /users/
 * @description Sistemdeki tüm kullanıcıları listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı dizisi, hata durumunda (401, 403, 500).
 */
router.get("/", authenticateToken, userController.getAllUsers);

/**
 * Rastgele kullanıcıları getirir (Öneri vb. için).
 * @route {GET} /users/random
 * @description Belirli sayıda rastgele kullanıcıyı getirir. Kimlik doğrulama gerektirir.
 * @param {number} [req.query.limit=5] - Getirilecek rastgele kullanıcı sayısı.
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı dizisi, hata durumunda (401, 500).
 */
router.get("/random", authenticateToken, userController.getRandomUsers);

/**
 * Aktif kullanıcının bilgilerini günceller.
 * @route {PUT} /users/me
 * @description Oturum açmış kullanıcının kendi profil bilgilerini günceller. Kimlik doğrulama gerektirir. (Body validasyonu eklenebilir).
 * @param {object} req.body - Güncellenecek bilgiler (örn: email, name, bio).
 * @returns {void} Başarılı olursa `200 OK` ile güncellenmiş kullanıcı objesi, hata durumunda (400, 401, 409, 500).
 */
// Belki validateUpdateUser gibi bir middleware eklenmeli
router.put("/me", authenticateToken, userController.updateUserById); // Controller ismi /me ile uyumlu olmalı, belki updateUserProfile daha iyi?

/**
 * Aktif kullanıcının hesabını siler.
 * @route {DELETE} /users/me
 * @description Oturum açmış kullanıcının kendi hesabını kalıcı olarak siler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda (401, 500).
 */
router.delete("/me", authenticateToken, userController.deleteUser); // Controller ismi genel deleteUser, belki deleteCurrentUser daha iyi?

export default router;
