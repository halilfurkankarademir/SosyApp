import savedController from "../controllers/savedController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateSaved } from "../middlewares/validators/savedValidator.js";

const router = express.Router();

// Aktif kullanıcının kaydedilen gonderilerini getirme
router.get("/", authenticateToken, savedController.getSavedPosts);

// Gonderiyi kaydetme
router.post(
    "/:postId",
    validateSaved,
    authenticateToken,
    savedController.savePost
);

// Gonderiyi kaydetme kismindan cikarma
router.delete(
    "/:postId",
    validateSaved,
    authenticateToken,
    savedController.unsavePost
);

// Kullanici gonderiyi kaydedip kaydedmedigini kontrol etme
router.get(
    "/check/:postId",
    validateSaved,
    authenticateToken,
    savedController.checkPostSaved
);

export default router;
