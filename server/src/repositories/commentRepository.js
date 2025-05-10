/**
 *  Yorum (Comment) veritabanı işlemlerini yönetir.
 */

import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

export default {
    /**
     * Yeni bir yorum oluşturur.
     * @param {string} userId - Yorumu yapan kullanıcının ID'si.
     * @param {number} postId - Yorumun yapıldığı gönderinin ID'si.
     * @param {string} content - Yorumun metin içeriği.
     * @returns {Promise<Comment>} Oluşturulan Comment modeli örneği.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async createComment(userId, postId, content) {
        try {
            const comment = await Comment.create({ userId, postId, content });
            return comment;
        } catch (error) {
            logger.error("Database error creating comment:", error);
            throw new Error(
                "Database error creating comment: " + error.message
            );
        }
    },

    /**
     * Belirli bir yorumu ID'sine göre siler.
     * @param {number} commentId - Silinecek yorumun ID'si.
     * @returns {Promise<void>} İşlem tamamlandığında resolve eder (dönüş değeri yok).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async deleteComment(commentId) {
        try {
            await Comment.destroy({ where: { id: commentId } });
        } catch (error) {
            logger.error("Error deleting comment:", error);
            throw new Error("Error deleting comment: " + error.message);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm yorumları (kullanıcı bilgileriyle) getirir.
     * @param {number} postId - Yorumları alınacak gönderinin ID'si.
     * @returns {Promise<Array<Comment>>} Bulunan Comment örnekleri dizisi (ilişkili User bilgileriyle).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async getCommentsByPostId(postId) {
        try {
            const comments = await Comment.findAll({
                where: { postId },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: [
                            "uid",
                            "username",
                            "profilePicture",
                            "firstName",
                            "lastName",
                        ],
                    },
                ],
            });
            return comments;
        } catch (error) {
            logger.error("Error getting comments by post ID:", error);
            throw new Error(
                "Error getting comments by post ID: " + error.message
            );
        }
    },

    /**
     * Belirli bir gönderiye ait yorum sayısını sayar.
     * @param {number} postId - Yorum sayısı alınacak gönderinin ID'si.
     * @returns {Promise<number>} Gönderiye ait yorum sayısı.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async getCommentCount(postId) {
        try {
            const commentCount = await Comment.count({ where: { postId } });
            return commentCount;
        } catch (error) {
            logger.error("Error getting comment count:", error);
            throw new Error("Error getting comment count: " + error.message);
        }
    },
};
