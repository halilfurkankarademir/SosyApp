/**
 * beğeni (Like) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import createHttpError from "http-errors";
import diContainer from "../config/dependencyInjection.js";
import { checkAdmin, getFilters, getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { likeService, postService } = diContainer;

/**
 * Beğeni işlemleri (oluşturma, silme, listeleme, kontrol) için controller fonksiyonlarını içerir.
 */
const likeController = {
    /**
     * Bir gönderiye beğeni ekler ve bildirim gönderir.
     */
    createLike: async (req, res, next) => {
        try {
            logger.info("Creating like...");

            const { postId } = req.params;
            const userId = req.user.uid;

            const like = await likeService.createLike(userId, postId, req.user);

            logger.info("Like created successfully");

            res.status(201).json(like);
        } catch (error) {
            logger.error("Error creating like:", error);
            next(error);
        }
    },
    /**
     * Bir gönderideki beğeniyi kaldırır.
     */
    deleteLike: async (req, res, next) => {
        try {
            logger.info("Deleting like...");

            const { postId } = req.params;
            const userId = req.user.uid;

            await likeService.deleteLike(userId, postId);

            logger.info("Like deleted successfully");

            res.status(200).json({ message: "Begeni iptal edildi." });
        } catch (error) {
            logger.error("Error deleting like:", error);
            next(error);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm beğenileri listeler.
     */
    getAllLikesByPostId: async (req, res, next) => {
        try {
            const isAdmin = checkAdmin(req.user.role);

            if (!isAdmin) {
                throw createHttpError(403, "Access denied");
            }

            logger.info("Getting likes...");

            const postId = req.params.postId;

            const likes = await likeService.getAllLikesByPostId(postId);

            logger.info("Likes fetched successfully");

            res.status(200).json(likes);
        } catch (error) {
            logger.error("Error getting likes:", error);
            next(error);
        }
    },

    /**
     * Aktif kullanıcının beğendiği gönderileri listeler (sayfalama ile).
     */
    getLikesByUserId: async (req, res, next) => {
        try {
            logger.info("Getting likes by user ID...");

            const userId = req.user.uid;

            const { limit, offset } = getPagination(
                req.query.page,
                req.query.limit
            );

            const { filterQuery } = getFilters(req.query.filter);

            const likes = await postService.getLikedPostsByUserId(
                userId,
                offset,
                limit,
                filterQuery
            );

            logger.info("Likes fetched successfully");

            res.status(200).json(likes);
        } catch (error) {
            logger.error("Error getting likes by user ID:", error);
            next(error);
        }
    },
};
export default likeController;
