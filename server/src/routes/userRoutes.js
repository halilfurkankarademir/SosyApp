import express from "express";
import { userController } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    validateEmail,
    validateUsername,
} from "../middlewares/validators/userValidator.js";

const router = express.Router();

// Tüm kullanıcıları getirme
router.get("/", authenticateToken, userController.getAllUsers);

// Kullanıcıyı ID ile getirme
router.get("/id/:userId", authenticateToken, userController.getUserById);

// Kullanıcıyı username ile getirme
router.get(
    "/username/:username",
    validateUsername,
    authenticateToken,
    userController.getUserByUsername
);

// Mevcut kullanıcıyı getirme
router.get("/me", authenticateToken, userController.getCurrent);

// Kullanıcıyı email ile getirme
router.get(
    "/email/:email",
    validateEmail,
    authenticateToken,
    userController.getUserByEmail
);

// Aktif Kullanıcı güncelleme
router.put("/me", authenticateToken, userController.updateUser);

// Aktif Kullanıcı silme
router.delete("/me", authenticateToken, userController.deleteUser);

export default router;
