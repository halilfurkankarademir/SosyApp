import express from "express";
import postController from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    validatePost,
    validatePostId,
} from "../middlewares/validators/postValidator.js";

const router = express.Router();

// Tüm gönderileri getirme
router.get("/", authenticateToken, postController.findPosts);

// Mevcut kullanicinin takip ettigi kullanicilarin gonderilerini getirme
router.get("/feed", authenticateToken, postController.getFeedPosts);

// Gönderiyi ID ile getirme
router.get("/:postId", validatePostId, postController.getPostById);

// Kullaniciya ait gonderileri getirme
router.get("/user/:userId", authenticateToken, postController.getPostsByUserId);

// Yeni gönderi oluşturma - token doğrulama eklendi
router.post("/", validatePost, authenticateToken, postController.createPost);

// Gonderiyi silme
router.delete(
    "/:postId",
    validatePostId,
    authenticateToken,
    postController.deletePost
);

export default router;
