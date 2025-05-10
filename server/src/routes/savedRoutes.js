/**
 *  Kaydedilen gönderi işlemleri için route'ları tanımlar.
 */

import savedController from "../controllers/savedController.js";
import express from "express";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Aktif kullanıcının kaydettiği gönderileri getirir.
 */
router.get("/me", authenticateToken, savedController.getSavedPosts);

/**
 * Bir gönderiyi kaydeder.
 */
router.post(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    savedController.savePost
);

/**
 * Bir gönderiyi kaydedilenlerden çıkarır.
 */
router.delete(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    savedController.unsavePost
);

export default router;
