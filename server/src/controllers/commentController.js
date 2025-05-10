/**
 * Yorum (Comment) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import logger from "../utils/logger.js";

const { commentService } = diContainer;

/**
 * Yorum oluşturma, silme, listeleme ve kontrol işlemleri için controller fonksiyonlarını içerir.
 */
const commentController = {
    /**
     * Yeni bir yorum oluşturur, gönderi sahibine bildirim gönderir.
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
                content,
                req.user
            );

            logger.info("Comment created successfully");

            res.status(201).json(comment);
        } catch (error) {
            logger.error("Error creating comment:", error);
            next(error);
        }
    },

    /**
     * Belirli bir yorumu ID'sine göre siler.
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
            next(error);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm yorumları getirir. Aktif kullanıcı ID'si de gönderilir.
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
            next(error);
        }
    },
};

export default commentController;
