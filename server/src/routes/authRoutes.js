import express from "express";
import authController from "../controllers/authController.js";
import {
    validateLogin,
    validateRegister,
} from "../middlewares/validators/authValidator.js";

const router = express.Router();

// Giris yapma
router.post("/login", validateLogin, authController.login);

// Kayit olma
router.post("/register", validateRegister, authController.register);

// Cikis yapma
router.post("/logout", authController.logout);

// Refresh token guncelleme
router.post("/refresh", authController.refreshToken);

export default router;
