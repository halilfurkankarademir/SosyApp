/**
 *  Begeni islemleri icin route'leri tanimlar.
 */

import express from "express";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Bir gönderinin tüm beğenilerini getirir.
 */
router.get(
    "/post/:postId",
    authenticateToken,
    validatePostId,
    likeController.getAllLikesByPostId
);

/**
 * Aktif kullanıcının beğendiği gönderileri getirir.
 */
router.get("/me", authenticateToken, likeController.getLikesByUserId);

/**
 * Bir gönderiyi beğenir.
 */
router.post(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    likeController.createLike
);

/**
 * Bir gönderideki beğeniyi kaldırır.
 */
router.delete(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    likeController.deleteLike
);

export default router;
