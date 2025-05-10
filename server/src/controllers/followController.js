/**
 * Takip etme/edilmeyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import { getFilters } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { followService } = diContainer;

/**
 * Takip etme/çıkarma, takipçi/takip edilen listeleme ve kontrol işlemleri için controller fonksiyonlarını içerir.
 */
const followController = {
    // ! FollowerId takip eden kullanıcı idsi, FollowingId takip edilen kullanıcı idsi

    /**
     * Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takip etmesini sağlar ve bildirim gönderir.
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

            logger.info("Follow created successfully");

            res.json(follow);
        } catch (error) {
            logger.error("Error in followController.createFollow:", error);
            next(error);
        }
    },
    /**
     * Aktif kullanıcının, ID'si verilen başka bir kullanıcıyı takipten çıkmasını sağlar.
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

            res.status(200).json(follower);
        } catch (error) {
            logger.error("Error in followController.deleteFollow:", error);
            next(error);
        }
    },

    /**
     *  Aktif kullanıcının, kendisini takip eden ve ID'si verilen bir kullanıcıyı takipçi listesinden çıkarmasını sağlar.
     */
    async deleteFollower(req, res, next) {
        try {
            logger.info("Deleting follower...");

            const followerId = req.params.followerId;
            const followingId = req.user.uid;

            const response = await followService.unfollowUser(
                followerId,
                followingId
            );

            logger.info("Follower deleted successfully");

            res.json(response);
        } catch (error) {
            logger.error("Error in followController.deleteFollower:", error);
            next(error);
        }
    },

    /**
     * Oturum açmış aktif kullanıcının takipçilerini listeler.
     */
    async getAuthenticatedUserFollowers(req, res, next) {
        try {
            logger.info("Getting authenticated user followers...");

            const userId = req.user.uid;
            const { filterQuery } = getFilters(req.query.filter);

            const followers = await followService.getFollowers(
                userId,
                filterQuery
            );

            logger.info("Authenticated user followers fetched successfully");

            res.status(200).json(followers);
        } catch (error) {
            logger.error(
                "Error in followController.getAuthenticatedUserFollowers:",
                error
            );
            next(error);
        }
    },

    /**
     * Oturum açmış aktif kullanıcının takip ettiği kişileri listeler.
     */
    async getAuthenticatedUserFollowing(req, res, next) {
        try {
            logger.info("Getting authenticated user following...");

            const userId = req.user.uid;
            const { filterQuery } = getFilters(req.query.filter);

            const following = await followService.getFollowing(
                userId,
                filterQuery
            );

            logger.info("Authenticated user following fetched successfully");

            res.json(following);
        } catch (error) {
            logger.error(
                "Error in followController.getAuthenticatedUserFollowing:",
                error
            );
            next(error);
        }
    },

    /**
     * ID'si verilen bir kullanıcının takipçilerini listeler.
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
            next(error);
        }
    },

    /**
     * ID'si verilen bir kullanıcının takip ettiği kişileri listeler. (Not: Kod aktif kullanıcıyı alıyor!)
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
            next(error);
        }
    },
};

export default followController;
