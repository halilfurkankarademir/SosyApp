/**
 * Beğeni (Like) veritabanı işlemlerini yönetir.
 */

import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Saved from "../models/savedModel.js";
import logger from "../utils/logger.js";

const likeRepository = {
    /**
     * Yeni bir beğeni kaydı oluşturur.
     * @param {string} userId - Beğenen kullanıcının ID'si.
     * @param {number} postId - Beğenilen gönderinin ID'si.
     * @returns {Promise<Like>} Oluşturulan Like modeli örneği.
     * @throws {Error} Veritabanı hatası (örn: zaten beğenilmişse unique constraint) durumunda.
     */
    async create(userId, postId, transaction) {
        try {
            const like = await Like.create({ userId, postId }, { transaction });
            return like;
        } catch (error) {
            logger.error("Error in likeRepository.create:", error);
            throw new Error("Database error creating like: " + error.message);
        }
    },

    /**
     * Kullanıcı ve gönderi ID'sine göre beğeni kaydını siler.
     * @param {string} userId - Kullanıcının ID'si.
     * @param {number} postId - Gönderinin ID'si.
     * @returns {Promise<number>} Silinen kayıt sayısı (genellikle 1 veya 0).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async deleteByUserIdAndPostId(userId, postId, transaction) {
        try {
            const result = await Like.destroy({
                where: { userId, postId },
                transaction,
            });
            return result;
        } catch (error) {
            logger.error(
                "Error in likeRepository.deleteByUserIdAndPostId:",
                error
            );
            throw new Error("Database error deleting like: " + error.message);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm beğenileri bulur.
     * @param {number} postId - Gönderinin ID'si.
     * @returns {Promise<Array<Like>>} Bulunan Like örnekleri dizisi.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findByPostId(postId) {
        try {
            const likes = await Like.findAll({ where: { postId } });
            return likes;
        } catch (error) {
            logger.error("Error in likeRepository.findByPostId:", error);
            throw new Error(
                "Database error finding likes by post ID: " + error.message
            );
        }
    },

    /**
     * Kullanıcı ve gönderi ID'sine göre tek bir beğeni kaydını bulur.
     * @param {string} userId - Kullanıcının ID'si.
     * @param {number} postId - Gönderinin ID'si.
     * @returns {Promise<Like|null>} Bulunan Like modeli örneği veya null.
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findOneByUserIdAndPostId(userId, postId, transaction) {
        try {
            const like = await Like.findOne({
                where: { userId, postId },
                transaction,
            });
            return like;
        } catch (error) {
            logger.error(
                "Error in likeRepository.findOneByUserIdAndPostId:",
                error
            );
            throw new Error(
                "Database error finding specific like: " + error.message
            );
        }
    },

    /**
     * Bir kullanıcının beğendiği tüm gönderilerin ID'lerini bulur.
     * @param {string} userId - Kullanıcının ID'si.
     * @returns {Promise<Array<number>>} Kullanıcının beğendiği gönderi ID'leri dizisi.
     * @throws {Error} Veritabanı hatası durumunda (fonksiyon içinde yakalanıyor ama dışarı fırlatılmıyor).
     */
    async findLikedPostIdsByUserId(userId) {
        try {
            const likes = await Like.findAll({
                where: { userId },
                order: [["createdAt", "DESC"]],
                attributes: ["postId"],
            });

            const postIds = likes.map((like) => like.postId);
            return postIds;
        } catch (error) {
            logger.error(
                "Error in likeRepository.findLikedPostIdsByUserId:",
                error
            );
            throw new Error(
                "Database error finding liked post IDs: " + error.message
            );
        }
    },

    /**
     * Bir kullanıcının beğendiği gönderileri (detaylarıyla birlikte) bulur.
     * @param {string|number} userId - Kullanıcının ID'si.
     * @returns {Promise<Array<Like>>} Kullanıcının beğeni kayıtlarını içeren dizi (ilişkili Post ve diğer detaylarla).
     * @throws {Error} Veritabanı hatası durumunda.
     */
    async findWithPostsByUserId(userId) {
        try {
            const likes = await Like.findAll({
                where: { userId },
                include: [
                    {
                        model: Post,
                        // Post altındaki ilişkileri de getir
                        include: [
                            {
                                model: User,
                                as: "user", // Post'un sahibinin alias'ı
                                attributes: [
                                    "uid", // Kullanıcı modeliniz uid kullanıyorsa
                                    "username",
                                    "profilePicture",
                                    "firstName",
                                    "lastName",
                                ],
                            },
                            { model: Like, attributes: ["userId"] },
                            { model: Comment, attributes: ["id"] },
                            { model: Saved, attributes: ["userId"] },
                        ],
                        attributes: [
                            "id",
                            "userId",
                            "content",
                            "media",
                            "createdAt",
                        ],
                    },
                ],
                order: [[Post, "createdAt", "DESC"]],
            });
            return likes;
        } catch (error) {
            logger.error(
                "Error in likeRepository.findWithPostsByUserId:",
                error
            );
            throw new Error(
                "Database error finding likes with posts by user ID: " +
                    error.message
            );
        }
    },
};

export default likeRepository;
