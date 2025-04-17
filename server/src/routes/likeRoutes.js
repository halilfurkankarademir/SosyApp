import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";

const router = express.Router();

// Begeni kontrol
router.get("/:postId", authenticateToken, likeController.checkLike);

// Gonderi beğenme
router.post("/:postId", authenticateToken, likeController.createLike);

// Gonderi beğenisini kaldırma
router.delete("/:postId", authenticateToken, likeController.deleteLike);

export default router;
