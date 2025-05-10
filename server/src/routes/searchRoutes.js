/**
 * Arama işlemleri için route'ları tanımlar.
 */

import searchController from "../controllers/searchController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateQuery } from "../middlewares/validators/searchValidator.js";

const router = express.Router();

/**
 * Kullanıcıları arar.
 */
router.get(
    "/users",
    validateQuery,
    authenticateToken,
    searchController.searchUsers
);

/**
 * Gönderileri arar.
 */
router.get(
    "/posts",
    validateQuery,
    authenticateToken,
    searchController.searchPosts
);

export default router;
