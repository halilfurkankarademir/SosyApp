/**
 * Kaydedilen gönderi işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import { getFilters, getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { savedService, postService } = diContainer;

/**
 *  Kaydedilen gönderi işlemleri (kaydetme, kaldırma, listeleme, kontrol etme) için controller fonksiyonlarını içerir.
 */
const savedController = {
    /**
     *  Bir gönderiyi aktif kullanıcının kaydedilenlerine ekler.
     */
    savePost: async (req, res, next) => {
        try {
            logger.info("Saving post...");

            const postId = req.params.postId;
            const userId = req.user.uid;

            const saved = await savedService.savePost(userId, postId);

            logger.info("Post saved successfully");

            res.status(201).json(saved);
        } catch (error) {
            logger.error("Error in savedController.savePost:", error);
            next(error);
        }
    },

    /**
     * Bir gönderiyi aktif kullanıcının kaydedilenlerinden çıkarır.
     */
    unsavePost: async (req, res, next) => {
        try {
            logger.info("Unsaving post...");

            const postId = req.params.postId;
            const userId = req.user.uid;

            await savedService.unsavePost(userId, postId);

            logger.info("Post un-saved successfully");

            res.status(200).json({ message: "Post un-saved successfully" });
        } catch (error) {
            logger.error("Error in savedController.unsavePost:", error);
            next(error);
        }
    },

    /**
     * Aktif kullanıcının kaydettiği gönderileri listeler (sayfalama ile).
     */
    getSavedPosts: async (req, res, next) => {
        try {
            logger.info("Getting saved posts...");

            const userId = req.user.uid;

            const { offset, limit } = getPagination(
                req.query.page,
                req.query.limit
            );

            const { filterQuery } = getFilters(req.query.filter);

            const savedPosts = await postService.getSavedPostsByUserId(
                userId,
                offset,
                limit,
                filterQuery
            );

            logger.info("Saved posts fetched successfully");

            res.status(200).json(savedPosts);
        } catch (error) {
            logger.error("Error in savedController.getSavedPosts:", error);
            next(error);
        }
    },
};

export default savedController;
