import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

// Tüm kullanıcıları getirme
router.get("/", userController.getAllUsers);

// Kullanıcıyı ID ile getirme
router.get("/:userId", userController.getUserById);

// Yeni kullanıcı oluşturma
router.post("/", userController.createUser);

// Kullanıcı silme
router.delete("/:userId", userController.deleteUser);

export default router;
