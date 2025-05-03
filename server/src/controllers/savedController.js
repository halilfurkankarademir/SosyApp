/**
 * @fileoverview Kaydedilen gönderi işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/savedController
 */

import diContainer from "../config/dependencyInjection.js";
import logger from "../utils/logger.js";

const { savedService, postService } = diContainer;

/**
 * @description Kaydedilen gönderi işlemleri (kaydetme, kaldırma, listeleme, kontrol etme) için controller fonksiyonlarını içerir.
 */
const savedController = {
    /**
     * @description Bir gönderiyi aktif kullanıcının kaydedilenlerine ekler.
     * @route POST /saved/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
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
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Bir gönderiyi aktif kullanıcının kaydedilenlerinden çıkarır.
     * @route DELETE /saved/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
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
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Aktif kullanıcının kaydettiği gönderileri listeler (sayfalama ile).
     * @route GET /saved/?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.user.uid` içerir, `req.query`'den page ve limit alınabilir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getSavedPosts: async (req, res, next) => {
        try {
            logger.info("Getting saved posts...");
            const userId = req.user.uid;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            const savedPosts = await postService.getSavedPostsByUserId(
                userId,
                page,
                limit
            );
            logger.info("Saved posts fetched successfully");
            res.status(200).json(savedPosts);
        } catch (error) {
            logger.error("Error in savedController.getSavedPosts:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },
};

export default savedController;
