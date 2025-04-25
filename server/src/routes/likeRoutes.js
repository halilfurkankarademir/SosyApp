import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";
import { validateLike } from "../middlewares/validators/likeValidator.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

// Bir gonderi icin tum begenileri getirme
router.get(
    "/post/:postId",
    validatePostId,
    authenticateToken,
    likeController.getAllLikes
);

// Aktif kullanicinin ilgili gonderiyi begenip begenmedigini kontrol eder
router.get(
    "/:postId/check",
    validatePostId,
    authenticateToken,
    likeController.checkLike
);

// Aktif kullaniciya ait likeleri getirme
router.get("/user", authenticateToken, likeController.getLikesByUserId);

// Gonderi beğenme
router.post(
    "/:postId",
    validateLike,
    authenticateToken,
    likeController.createLike
);

// Gonderi beğenisini kaldırma
router.delete(
    "/:postId",
    validatePostId,
    authenticateToken,
    likeController.deleteLike
);

export default router;
