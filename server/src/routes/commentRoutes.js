import commentController from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

// Yorum olusturma
router.post("/:postId", authenticateToken, commentController.createComment);

// Yorum silme
router.delete(
    "/:commentId",
    authenticateToken,
    commentController.deleteComment
);

// Bir gonderiye ait tum yorumlari getirme
router.get(
    "/:postId",
    authenticateToken,
    commentController.getCommentsByPostId
);

export default router;
