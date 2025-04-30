import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import commentRepository from "../repositories/commentRepository.js";
import logger from "../utils/logger.js";

/**
 * Yorum işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace commentService
 */
const commentService = {
    /**
     * Yorum olusturma işlemini yapar.
     * @memberof commentService
     * @param {string} userId yorumu yapan kullanıcının ID'si
     * @param {number} postId  yorum yapılan gönderinin ID'si
     * @param {string} content yorumun icerigi
     * @returns {Comment} olusturulan yorum nesnesini döndürür
     */
    createComment: async (userId, postId, content) => {
        try {
            const comment = await commentRepository.createComment(
                userId,
                postId,
                content
            );

            if (!comment) {
                logger.error("Comment creation failed");
                throw new Error("Comment creation failed");
            }

            return comment;
        } catch (error) {
            logger.error("Error creating comment:", error);
            throw new Error("Error creating comment: " + error.message);
        }
    },

    /**
     * Yorum idsi alarak yorum silme işlemini yapar.
     * @memberof commentService
     * @param {number} commentId silinmek istenen yorumun ID'si
     * @returns {void} boş döndürür
     */
    deleteComment: async (commentId) => {
        try {
            await commentRepository.deleteComment(commentId);
        } catch (error) {
            throw new Error("Error deleting comment: " + error.message);
        }
    },

    /**
     * Belirli bir gonderiye ait yorumları alır.
     * @memberof commentService
     * @param {number} postId yorumları almak istenen gönderinin ID'si
     * @returns {Comment[]} gonderiye ait atilan yorumların listesini döndürür
     */
    getCommentsByPostId: async (postId) => {
        try {
            logger.info("Getting comments", postId);
            const comments = await commentRepository.getCommentsByPostId(
                postId
            );
            if (!comments) {
                logger.error("Comments not found");
                throw new Error("Comments not found");
            }
            logger.info("Comments found", comments);
            return comments;
        } catch (error) {
            throw new Error("Error getting comments: " + error.message);
        }
    },

    /**
     * Belirli bir gonderiye ait yorum sayısını alır.
     * @memberof commentService
     * @param {number} postId yorum sayısını almak istenen gönderinin ID'si
     * @returns {number} gonderiye ait yorum sayısını döndürür
     */
    getCommentCountByPostId: async (postId) => {
        try {
            logger.info("Getting comment count", postId);
            const commentCount = await commentRepository.getCommentCount(
                postId
            );
            if (!commentCount) {
                logger.error("Comment count not found");
                throw new Error("Comment count not found");
            }
            logger.info("Comment count found", commentCount);
            return commentCount;
        } catch (error) {
            throw new Error("Error getting comment count: " + error.message);
        }
    },
};

export default commentService;
