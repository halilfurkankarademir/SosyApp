/**
 * @fileoverview Takip etme/edilmeyle ilgili route'ları tanimlar.
 * @module routes/followRoutes
 */

import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import followController from "../controllers/followController.js";
import {
    validateFollow,
    validateFollowingUserId,
} from "../middlewares/validators/followValidator.js";
import { validateUserId } from "../middlewares/validators/userValidator.js";

const router = express.Router();

/**
 * Aktif kullanıcının takipçilerini getirir.
 * @route {GET} /follow/followers
 * @description Oturum açmış kullanıcının takipçilerini listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile takipçi kullanıcı dizisi, hata durumunda (401, 500).
 */
router.get(
    "/followers",
    authenticateToken,
    followController.getAuthenticatedUserFollowers
);

/**
 * Aktif kullanıcının takip ettiği kişileri getirir.
 * @route {GET} /follow/following
 * @description Oturum açmış kullanıcının takip ettiği kişileri listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile takip edilen kullanıcı dizisi, hata durumunda (401, 500).
 */
router.get(
    "/following",
    authenticateToken,
    followController.getAuthenticatedUserFollowing
);

/**
 * Belirli bir kullanıcının takipçilerini getirir.
 * @route {GET} /follow/followers/:followingUserId
 * @description ID'si verilen kullanıcının takipçilerini listeler. Kimlik doğrulama ve `followingUserId` doğrulaması (`validateFollow`?) gerektirir.
 * @param {string} req.params.followingUserId - Takipçileri listelenecek kullanıcının ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile takipçi kullanıcı dizisi, hata durumunda (400, 401, 404, 500).
 */
router.get(
    "/followers/:followingUserId",
    // validateFollow yerine belki validateUserId(followingUserId) daha uygun?
    validateFollowingUserId,
    authenticateToken,
    followController.getFollowersById
);

/**
 * Belirli bir kullanıcının takip ettiklerini getirir.
 * @route {GET} /follow/following/:userId
 * @description ID'si verilen kullanıcının takip ettiği kişileri listeler. Kimlik doğrulama ve `userId` doğrulaması (`validateFollow`?) gerektirir.
 * @param {string} req.params.userId - Takip ettikleri listelenecek kullanıcının ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile takip edilen kullanıcı dizisi, hata durumunda (400, 401, 404, 500).
 */
// Not: Orijinal kodunuzdaki path '/following' idi, ancak controller adına göre '/following/:userId' olmalı.
router.get(
    "/following/:userId", // Path'i controller adına göre düzelttim.
    // validateFollow yerine belki validateUserId(userId) daha uygun?
    validateUserId,
    authenticateToken,
    followController.getFollowingById
);

/**
 * Bir kullanıcıyı takip eder.
 * @route {POST} /follow/:userId
 * @description ID'si verilen kullanıcıyı takip etme işlemini gerçekleştirir. Kimlik doğrulama ve `userId` doğrulaması (`validateFollow`?) gerektirir.
 * @param {string} req.params.userId - Takip edilecek kullanıcının ID'si.
 * @returns {void} Başarılı olursa `201 Created` ile takip bilgisi, hata durumunda (400, 401, 404, 409, 500).
 */
router.post(
    "/:userId",
    validateUserId,
    authenticateToken,
    followController.createFollow
);

/**
 * Bir kullanıcıyı takipten çıkarır.
 * @route {DELETE} /follow/:userId
 * @description ID'si verilen kullanıcıyı takipten çıkarma işlemini gerçekleştirir. Kimlik doğrulama ve `userId` doğrulaması (`validateFollow`?) gerektirir.
 * @param {string} req.params.userId - Takipten çıkarılacak kullanıcının ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda (400, 401, 404, 500).
 */
router.delete(
    "/:userId",
    // validateFollow yerine belki validateUserId(userId) daha uygun?
    validateUserId,
    authenticateToken,
    followController.deleteFollow
);

/**
 * Aktif kullanıcıyı takip eden birini takipçi listesinden kaldırır.
 * @route {DELETE} /follow/follower/:followerId
 * @description ID'si verilen takipçiyi, aktif kullanıcının takipçi listesinden çıkarır. Kimlik doğrulama ve `followerId` doğrulaması (`validateFollow`?) gerektirir.
 * @param {string} req.params.followerId - Takipçi listesinden çıkarılacak kullanıcının ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda (400, 401, 404, 500).
 */
router.delete(
    "/follower/:followerId",
    // validateFollow yerine belki validateUserId(followerId) daha uygun?
    validateFollow,
    authenticateToken,
    followController.deleteFollower
);

export default router;
