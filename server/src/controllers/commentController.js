/**
 * @fileoverview Yorum (Comment) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/commentController
 */

import diContainer from "../config/dependencyInjection.js";
import { sendCommentNotification } from "../services/notificationService.js";
import logger from "../utils/logger.js";

const { commentService, postService } = diContainer;

/**
 * @description Yorum oluşturma, silme ve listeleme/sayma işlemleri için controller fonksiyonlarını içerir.
 */
const commentController = {
    /**
     * @description Yeni bir yorum oluşturur, gönderi sahibine bildirim gönderir.
     * @route POST /comments/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId`, `req.body.content` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    createComment: async (req, res, next) => {
        try {
            logger.info("Creating comment...");

            const userId = req.user.uid;
            const postId = req.params.postId;
            const content = req.body.content;
            const comment = await commentService.createComment(
                userId,
                postId,
                content
            );
            const postDetails = await postService.getPostById(postId);
            const postOwnerId = postDetails.user.uid;
            sendCommentNotification(req.user, postOwnerId, postId);
            logger.info("Comment created successfully");
            res.status(201).json(comment);
        } catch (error) {
            logger.error("Error creating comment:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Belirli bir yorumu ID'sine göre siler.
     * @route DELETE /comments/:commentId
     * @param {object} req - Express istek nesnesi. `req.params.commentId` silinecek yorum ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deleteComment: async (req, res, next) => {
        try {
            logger.info("Deleting comment...");
            const commentId = req.params.commentId;
            await commentService.deleteComment(commentId);
            logger.info("Comment deleted successfully");
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            logger.error("Error deleting comment:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Belirli bir gönderiye ait tüm yorumları getirir. Aktif kullanıcı ID'si de gönderilir.
     * @route GET /comments/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getCommentsByPostId: async (req, res, next) => {
        try {
            logger.info("Getting comments...");
            const postId = req.params.postId;
            const requestUserId = req.user.uid;
            const comments = await commentService.getCommentsByPostId(
                postId,
                requestUserId
            );
            logger.info("Comments fetched successfully");
            res.status(200).json(comments);
        } catch (error) {
            logger.error("Error getting comments:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Belirli bir gönderiye ait yorum sayısını getirir.
     * @route GET /comments/count/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getCommentCountByPostId: async (req, res, next) => {
        try {
            logger.info("Getting comment count...");
            const postId = req.params.postId;
            const commentCount = await commentService.getCommentCountByPostId(
                postId
            );
            res.status(200).json(commentCount);
        } catch (error) {
            logger.error("Error getting comment count:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },
};

export default commentController;
