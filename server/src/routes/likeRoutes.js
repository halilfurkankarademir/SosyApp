import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";

const router = express.Router();

// Bir gonderi icin tum begenileri getirme
router.get("/:postId", authenticateToken, likeController.getAllLikes);

// Aktif kullanicinin ilgili gonderiyi begenip begenmedigini kontrol eder
router.get("/:postId/check", authenticateToken, likeController.checkLike);

// Gonderi beğenme
router.post("/:postId", authenticateToken, likeController.createLike);

// Gonderi beğenisini kaldırma
router.delete("/:postId", authenticateToken, likeController.deleteLike);

export default router;
