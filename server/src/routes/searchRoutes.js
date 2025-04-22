import searchController from "../controllers/searchController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Kullanici aramasi islemi
router.get("/users", authenticateToken, searchController.searchUsers);

// Gonderi aramasi islemi
router.get("/posts", authenticateToken, searchController.searchPosts);

export default router;
