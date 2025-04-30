/**
 * @fileoverview Yorum (Comment) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/commentController
 */

// yorum ekleme islemleri icin controllerlar
import commentService from "../services/commentService.js";
import { sendCommentNotification } from "../services/notificationService.js";
import PostService from "../services/postService.js";

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
    createComment: async (req, res) => {
        try {
            const userId = req.user.uid;
            const postId = req.params.postId;
            const content = req.body.content;
            const comment = await commentService.createComment(
                userId,
                postId,
                content
            );
            const postDetails = await PostService.getPostById(postId);
            const postOwnerId = postDetails.user.uid;
            sendCommentNotification(req.user, postOwnerId, postId);
            res.status(201).json(comment);
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Belirli bir yorumu ID'sine göre siler.
     * @route DELETE /comments/:commentId
     * @param {object} req - Express istek nesnesi. `req.params.commentId` silinecek yorum ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentService.deleteComment(commentId);
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Belirli bir gönderiye ait tüm yorumları getirir. Aktif kullanıcı ID'si de gönderilir.
     * @route GET /comments/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getCommentsByPostId: async (req, res) => {
        try {
            const postId = req.params.postId;
            const requestUserId = req.user.uid;
            const comments = await commentService.getCommentsByPostId(
                postId,
                requestUserId
            );
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error getting comments:", error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Belirli bir gönderiye ait yorum sayısını getirir.
     * @route GET /comments/count/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getCommentCountByPostId: async (req, res) => {
        try {
            const postId = req.params.postId;
            const commentCount = await commentService.getCommentCountByPostId(
                postId
            );
            res.status(200).json(commentCount); // Sadece sayıyı veya { count: ... } objesini dönebilir
        } catch (error) {
            console.error("Error getting comment count:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default commentController;
