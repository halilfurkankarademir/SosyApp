import savedController from "../controllers/savedController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Aktif kullanıcının kaydedilen gonderilerini getirme
router.get("/", authenticateToken, savedController.getSavedPosts);

// Gonderiyi kaydetme
router.post("/:postId", authenticateToken, savedController.savePost);

// Gonderiyi kaydetme kismindan cikarma
router.delete("/:postId", authenticateToken, savedController.unsavePost);

// Kullanici gonderiyi kaydedip kaydedmedigini kontrol etme
router.get("/check/:postId", authenticateToken, savedController.checkPostSaved);

export default router;
