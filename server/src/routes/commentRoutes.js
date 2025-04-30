import commentController from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    validateComment,
    validateCommentId,
} from "../middlewares/validators/commentValidator.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

// Yorum olusturma
router.post(
    "/:postId",
    validatePostId,
    validateComment,
    authenticateToken,
    commentController.createComment
);

// Yorum silme
router.delete(
    "/:commentId",
    validateCommentId,
    authenticateToken,
    commentController.deleteComment
);

// Bir gonderiye ait tum yorumlari getirme
router.get(
    "/:postId",
    validatePostId,
    authenticateToken,
    commentController.getCommentsByPostId
);

// Bir gonderideki yorum sayisini getirme
router.get(
    "/count/:postId",
    validatePostId,
    authenticateToken,
    commentController.getCommentCountByPostId
);

export default router;
