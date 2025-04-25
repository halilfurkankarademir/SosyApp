import searchController from "../controllers/searchController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateSearch } from "../middlewares/validators/searchValidator.js";

const router = express.Router();

// Kullanici aramasi islemi
router.get(
    "/users",
    validateSearch,
    authenticateToken,
    searchController.searchUsers
);

// Gonderi aramasi islemi
router.get(
    "/posts",
    validateSearch,
    authenticateToken,
    searchController.searchPosts
);

export default router;
