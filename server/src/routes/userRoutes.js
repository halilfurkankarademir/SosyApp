/**
 * Kullanici profili ve bilgileriyle ilgili route'ları tanimlar.
 */

import express from "express";
import userController from "../controllers/userController.js";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import {
    validateEmail,
    validateUsername,
    validateUserId,
} from "../middlewares/validators/userValidator.js";

const router = express.Router();

/**
 * Oturum açmış aktif kullanıcıyı getirir.
 */
router.get("/me", authenticateToken, userController.getCurrentUser);

/**
 * Belirli bir kullanıcıyı ID ile getirir.
 */
router.get(
    "/id/:userId",
    validateUserId,
    authenticateToken,
    userController.getUserById
);

/**
 * Kullanıcı profilini kullanıcı adı ile getirir.
 */
router.get(
    "/username/:username",
    validateUsername,
    authenticateToken,
    userController.getUserProfileDetails
);

/**
 * Belirli bir kullanıcıyı e-posta adresi ile getirir.
 */
router.get(
    "/email/:email",
    validateEmail,
    authenticateToken,
    userController.getUserByEmail
);

/**
 * Tüm kullanıcıları listeler (Admin yetkisi gerekebilir).
 */
router.get("/", authenticateToken, userController.getAllUsers);

/**
 * Rastgele kullanıcıları getirir (Öneri vb. için).
 */
router.get("/random", authenticateToken, userController.getRandomUsers);

/**
 * Aktif kullanıcının bilgilerini günceller.
 */
// Belki validateUpdateUser gibi bir middleware eklenmeli
router.put("/me", authenticateToken, verifyCSRF, userController.updateUserById);

/**
 * Aktif kullanıcının hesabını siler.
 */
router.delete("/me", authenticateToken, verifyCSRF, userController.deleteUser);

export default router;
