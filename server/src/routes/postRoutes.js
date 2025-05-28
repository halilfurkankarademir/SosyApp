/**
 *  Gonderi (Post) islemleri icin route'lari tanimlar.
 */

import express from "express";
import postController from "../controllers/postController.js";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import {
    validatePost,
    validatePostId,
} from "../middlewares/validators/postValidator.js";
import { validateUserId } from "../middlewares/validators/userValidator.js";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import cacheConfig from "../config/cacheConfig.js";

const router = express.Router();

/**
 * Aktif kullanıcının takip ettiği kişilerin gönderilerini (feed) getirir.
 */
router.get("/feed", authenticateToken, postController.getFeedPosts);

/**
 * Trend gönderilerini getirir.
 */
router.get(
    "/trendings",
    authenticateToken,
    cacheMiddleware(cacheConfig.trendingPosts),
    postController.getTrendingPosts
);

/**
 * Belirli bir gönderiyi ID ile getirir.
 */
router.get(
    "/:postId",
    authenticateToken,
    validatePostId,
    postController.getPostById
);

/**
 * Belirli bir kullanıcının gönderilerini getirir.
 */
router.get(
    "/user/:userId",
    authenticateToken,
    validateUserId,
    postController.getPostsByUserId
);

/**
 * Yeni gönderi oluşturur.
 */
router.post(
    "/",
    authenticateToken,
    verifyCSRF,
    validatePost,
    postController.createPost
);

/**
 * Belirli bir gönderiyi siler.
 */
router.delete(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    postController.deletePost
);

export default router;
