/**
 * Takip etme/edilmeyle ilgili route'ları tanimlar.
 */

import express from "express";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import followController from "../controllers/followController.js";
import { validateFollowerUserId } from "../middlewares/validators/followValidator.js";
import { validateUserId } from "../middlewares/validators/userValidator.js";

const router = express.Router();

/**
 * Aktif kullanıcının takipçilerini getirir.
 */
router.get(
    "/followers",
    authenticateToken,
    followController.getAuthenticatedUserFollowers
);

/**
 * Aktif kullanıcının takip ettiği kişileri getirir.
 */
router.get(
    "/following",
    authenticateToken,
    followController.getAuthenticatedUserFollowing
);

/**
 * Bir kullanıcıyı takip eder.
 */
router.post(
    "/:userId",
    authenticateToken,
    verifyCSRF,
    validateUserId,
    followController.createFollow
);

/**
 * Bir kullanıcıyı takipten çıkarır.
 */
router.delete(
    "/:userId",
    authenticateToken,
    verifyCSRF,
    validateUserId,
    followController.deleteFollow
);

/**
 * Aktif kullanıcıyı takip eden birini takipçi listesinden kaldırır.
 */
router.delete(
    "/follower/:followerId",
    authenticateToken,
    verifyCSRF,
    validateFollowerUserId,
    followController.deleteFollower
);

export default router;
