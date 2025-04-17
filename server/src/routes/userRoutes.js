import express from "express";
import { userController } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tüm kullanıcıları getirme
router.get("/", userController.getAllUsers);

// Kullanıcıyı ID ile getirme
router.get("/id/:userId", userController.getUserById);

// Kullanıcıyı username ile getirme
router.get("/username/:username", userController.getUserByUsername);

// Mevcut kullanıcıyı getirme
router.get("/current", authenticateToken, userController.getCurrent);

// Kullanıcıyı email ile getirme
router.get("/email/:email", userController.getUserByEmail);

// Yeni kullanıcı oluşturma
router.post("/", userController.createUser);

// Kullanıcı güncelleme
router.put("/", authenticateToken, userController.updateUser);

// Kullanıcı silme
router.delete("/:userId", userController.deleteUser);

export default router;
