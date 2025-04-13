import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

// Tüm gönderileri getirme
router.get("/", postController.getAllPosts);

// Gönderiyi ID ile getirme
router.get("/:postId", postController.getPostById);

// Yeni gönderi oluşturma
router.post("/", postController.createPost);

// Gönderi silme (örneğin, ID ile silme işlemi eklenebilir)
router.delete("/:postId", postController.deletePost);

export default router;
