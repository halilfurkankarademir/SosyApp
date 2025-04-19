import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";

const router = express.Router();

// Bir gonderi icin tum begenileri getirme
router.get("/post/:postId", authenticateToken, likeController.getAllLikes);

// Aktif kullanicinin ilgili gonderiyi begenip begenmedigini kontrol eder
router.get("/:postId/check", authenticateToken, likeController.checkLike);

// Aktif kullaniciya ait likeleri getirme
router.get("/user", authenticateToken, likeController.getLikesByUserId);

// Gonderi beğenme
router.post("/:postId", authenticateToken, likeController.createLike);

// Gonderi beğenisini kaldırma
router.delete("/:postId", authenticateToken, likeController.deleteLike);

export default router;
