import express from "express";
import postController from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tüm gönderileri getirme
router.get("/", authenticateToken, postController.getAllPosts);

// Gönderiyi ID ile getirme
router.get("/:postId", postController.getPostById);

// Kullaniciya ait gonderileri getirme
router.get("/user/:userId", authenticateToken, postController.getPostByUserId);

// Yeni gönderi oluşturma - token doğrulama eklendi
router.post("/", authenticateToken, postController.createPost);

// Gonderiyi silme
router.delete("/:postId", authenticateToken, postController.deletePost);

export default router;
