/**
 * Yorum islemleri icin route'lari tanimlar.
 */

import commentController from "../controllers/commentController.js";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import express from "express";
import {
    validateComment,
    validateCommentId,
} from "../middlewares/validators/commentValidator.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Belirli bir gönderiye yorum oluşturur.
 */
router.post(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    validateComment,
    commentController.createComment
);

/**
 * Belirli bir yorumu siler.
 */
router.delete(
    "/:commentId",
    authenticateToken,
    verifyCSRF,
    validateCommentId,
    commentController.deleteComment
);

/**
 * Bir gönderiye ait tüm yorumları getirir.
 */
router.get(
    "/:postId",
    validatePostId,
    authenticateToken,
    commentController.getCommentsByPostId
);

export default router;
