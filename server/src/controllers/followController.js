/**
 * @fileoverview Takip etme/edilmeyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/followController
 */

import diContainer from "../config/dependencyInjection.js";
import { sendFollowNotification } from "../services/notificationService.js";
import logger from "../utils/logger.js";

const { followService, userService } = diContainer;

/**
 * @description Takip etme/çıkarma, takipçi/takip edilen listeleme ve kontrol işlemleri için controller fonksiyonlarını içerir.
 */
const followController = {
    // FollowerId takip eden kullanıcı idsi, FollowingId takip edilen kullanıcı idsi

    /**
     * @description Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takip etmesini sağlar ve bildirim gönderir.
     * @route POST /follow/:userId
     * @param {object} req - Express istek nesnesi. `req.params.userId` takip edilecek kullanıcı ID'sini, `req.user.uid` takip eden kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async createFollow(req, res, next) {
        try {
            logger.info("Creating follow...");
            const followedUserId = req.params.userId;
            const followerId = req.user.uid;
            const follow = await followService.followUser(
                followerId,
                followedUserId
            );
            const followerUser = await userService.getUserById(
                followerId,
                req.ip
            ); // req.ip kullanımı? Gerekli mi?
            sendFollowNotification(followerUser, followedUserId);
            logger.info("Follow created successfully");
            res.json(follow);
        } catch (error) {
            logger.error("Error in followController.createFollow:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },
    /**
     * @description Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takipten çıkmasını sağlar.
     * @route DELETE /follow/:userId
     * @param {object} req - Express istek nesnesi. `req.params.userId` takipten çıkarılacak kullanıcı ID'sini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async deleteFollow(req, res, next) {
        try {
            logger.info("Deleting follow...");
            const { userId } = req.params;
            const followerId = req.user.uid;
            const follower = await followService.unfollowUser(
                followerId,
                userId
            );
            logger.info("Follow deleted successfully");
            res.json(follower);
        } catch (error) {
            logger.error("Error in followController.deleteFollow:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Aktif kullanıcının, kendisini takip eden ve ID'si verilen bir kullanıcıyı takipçi listesinden çıkarmasını sağlar.
     * @route DELETE /follow/follower/:followerId
     * @param {object} req - Express istek nesnesi. `req.params.followerId` çıkarılacak takipçi ID'sini, `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async deleteFollower(req, res, next) {
        try {
            logger.info("Deleting follower...");
            const followerId = req.params.followerId;
            const followingId = req.user.uid;
            const response = await followService.removeFollower(
                followerId,
                followingId
            );
            logger.info("Follower deleted successfully");
            res.json(response);
        } catch (error) {
            logger.error("Error in followController.deleteFollower:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Oturum açmış aktif kullanıcının takipçilerini listeler.
     * @route GET /follow/followers
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getAuthenticatedUserFollowers(req, res, next) {
        try {
            logger.info("Getting authenticated user followers...");
            const userId = req.user.uid;
            const followers = await followService.getFollowers(userId);
            logger.info("Authenticated user followers fetched successfully");
            res.json(followers);
        } catch (error) {
            logger.error(
                "Error in followController.getAuthenticatedUserFollowers:",
                error
            );
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Oturum açmış aktif kullanıcının takip ettiği kişileri listeler.
     * @route GET /follow/following
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getAuthenticatedUserFollowing(req, res, next) {
        try {
            logger.info("Getting authenticated user following...");
            const userId = req.user.uid;
            const following = await followService.getFollowing(userId);
            logger.info("Authenticated user following fetched successfully");
            res.json(following);
        } catch (error) {
            logger.error(
                "Error in followController.getAuthenticatedUserFollowing:",
                error
            );
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description ID'si verilen bir kullanıcının takipçilerini listeler.
     * @route GET /follow/followers/:followingUserId
     * @param {object} req - Express istek nesnesi. `req.params.followingUserId` takipçileri listelenecek kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    async getFollowersById(req, res, next) {
        try {
            logger.info("Getting followers by ID...");
            const followingId = req.params.followingUserId;
            const followers = await followService.getFollowers(followingId);
            logger.info("Followers fetched successfully");
            res.json(followers);
        } catch (error) {
            logger.error("Error in followController.getFollowersById:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description ID'si verilen bir kullanıcının takip ettiği kişileri listeler. (Not: Kod aktif kullanıcıyı alıyor!)
     * @route GET /follow/following/:userId (?) (Kod aktif kullanıcıyı işliyor, route tanımını kontrol edin)
     * @param {object} req - Express istek nesnesi. (Kod `req.user.uid` kullanıyor).
     * @param {object} res - Express yanıt nesnesi.
     */
    async getFollowingById(req, res, next) {
        try {
            logger.info("Getting following by ID...");
            const followingId = req.user.uid;
            const following = await followService.getFollowing(followingId);
            logger.info("Following fetched successfully");
            res.json(following);
        } catch (error) {
            logger.error("Error in followController.getFollowingById:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },
};

export default followController;
