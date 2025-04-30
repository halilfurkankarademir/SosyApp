/**
 * @fileoverview Arama işlemleri (kullanıcı ve gönderi) için route'ları tanımlar.
 * @module routes/searchRoutes
 */

import searchController from "../controllers/searchController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateQuery } from "../middlewares/validators/searchValidator.js";

const router = express.Router();

/**
 * Kullanıcıları arar.
 * @route {GET} /search/users
 * @description Belirtilen sorgu terimine göre kullanıcıları arar. Kimlik doğrulama ve arama sorgusu (`validateQuery`) doğrulaması gerektirir.
 * @param {string} req.query.q - Arama yapılacak terim (veya `validateSearch`'in beklediği parametre).
 * @returns {void} Başarılı olursa `200 OK` ile kullanıcı dizisi, hata durumunda ilgili status kodları (400, 401, 500).
 */
router.get(
    "/users",
    validateQuery,
    authenticateToken,
    searchController.searchUsers
);

/**
 * Gönderileri arar.
 * @route {GET} /search/posts
 * @description Belirtilen sorgu terimine göre gönderileri arar. Kimlik doğrulama ve arama sorgusu (`validateQuery`) doğrulaması gerektirir.
 * @param {string} req.query.q - Arama yapılacak terim (veya `validateSearch`'in beklediği parametre).
 * @returns {void} Başarılı olursa `200 OK` ile gönderi dizisi, hata durumunda ilgili status kodları (400, 401, 500).
 */
router.get(
    "/posts",
    validateQuery,
    authenticateToken,
    searchController.searchPosts
);

export default router;
