import express from "express";
import { userController } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    validateEmail,
    validateUsername,
} from "../middlewares/validators/userValidator.js";

const router = express.Router();

// Mevcut kullanıcıyı getirme (En spesifik 'get' işlemi)
router.get("/me", authenticateToken, userController.getCurrentUser);

// Kullanıcıyı ID ile getirme
router.get("/id/:userId", authenticateToken, userController.getUserById);

// Kullanıcı prolini username ile getirme
router.get(
    "/username/:username",
    validateUsername,
    authenticateToken,
    userController.getUserProfileDetails
);

// Kullanıcıyı email ile getirme
router.get(
    "/email/:email",
    validateEmail,
    authenticateToken,
    userController.getUserByEmail
);

// Tüm kullanıcıları getirme (En genel 'get' işlemi)
router.get("/", authenticateToken, userController.getAllUsers);

// Rastgele kullanıcıları getirme
router.get("/random", authenticateToken, userController.getRandomUsers);

// Aktif Kullanıcı güncelleme ('me' ile ilgili 'update' işlemi)
router.put("/me", authenticateToken, userController.updateUserById);

// Aktif Kullanıcı silme ('me' ile ilgili 'delete' işlemi)
router.delete("/me", authenticateToken, userController.deleteUser);

export default router;
