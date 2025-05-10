import createHttpError from "http-errors";
import sequelize from "../config/sequelize.js";
import { sendLikeNotification } from "./notificationService.js";

/**
 * Beğeni (like) işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 */
const likeService = (likeRepository, postRepository) => ({
    /**
     * Bir kullanıcının bir gönderiyi beğenmesini sağlar.
     * @param {string} userId - Beğeniyi yapan kullanıcının ID'si.
     * @param {number} postId - Beğenilen gönderinin ID'si.
     * @param {string} requestedUser - Beğeniyi yapan kullanıcının nesnesi.
     * @returns {Promise<Like>} Oluşturulan beğeni kaydı nesnesi.
     */
    async createLike(userId, postId, requestedUser) {
        const t = await sequelize.startUnmanagedTransaction();
        try {
            const existingLike = await likeRepository.findOneByUserIdAndPostId(
                userId,
                postId
            );

            if (existingLike) {
                await t.commit();
                return existingLike;
            }

            await postRepository.incrementLikeCount(postId, t);

            const like = await likeRepository.create(userId, postId, t);

            await t.commit();

            const post = await postRepository.findById(postId);

            if (!post) {
                throw createHttpError(404, "Post not found.");
            }

            sendLikeNotification(requestedUser, post.userId, postId);

            return like;
        } catch (error) {
            await t.rollback();
            throw createHttpError(500, "Failed to create like.");
        }
    },

    /**
     * Bir kullanıcının bir gönderideki beğenisini kaldırır.
     * @param {string} userId - Beğeniyi iptal eden kullanıcının ID'si.
     * @param {number} postId - Beğeniyi iptal edilen gönderinin ID'si.
     * @returns {Promise<{ success: boolean, message: string, deletedCount: number }>} Beğeni kaldırma işleminin sonucunu temsil eden nesne.
     */
    async deleteLike(userId, postId) {
        const t = await sequelize.startUnmanagedTransaction();
        try {
            const existingLike = await likeRepository.findOneByUserIdAndPostId(
                userId,
                postId,
                t
            );

            if (!existingLike) {
                await t.rollback();
                return {
                    success: false,
                    message: "Kaldırılacak beğeni bulunamadı.",
                    deletedCount: 0,
                };
            }

            const deletedCount = await likeRepository.deleteByUserIdAndPostId(
                userId,
                postId,
                t
            );

            if (deletedCount > 0) {
                await postRepository.decrementLikeCount(postId, t);
            }

            await t.commit();

            return {
                success: true,
                message: "Beğeni başarıyla kaldırıldı.",
                deletedCount,
            };
        } catch (error) {
            await t.rollback();
            throw createHttpError(500, "Failed to delete like.");
        }
    },

    /**
     * Belirli bir gönderiye ait tüm beğenileri getirir.
     * @param {number} postId - Beğenileri getirilecek gönderinin ID'si.
     * @returns {Promise<Array<Like>>} Belirtilen gönderiye ait beğeni kayıtlarının dizisi.
     */
    async getAllLikesByPostId(postId) {
        try {
            const likes = await likeRepository.findByPostId(postId);
            return likes;
        } catch (error) {
            throw createHttpError(500, "Failed to get likes by post ID.");
        }
    },

    /**
     * Belirli bir kullanıcının yaptığı tüm beğenileri (ilişkili gönderi bilgileriyle birlikte) getirir.
     * @param {string} userId - Beğenileri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<Post>>} Kullanıcının yaptığı beğeni kayıtlarının dizisi.
     */
    async getLikesByUserId(userId) {
        try {
            const likes = await likeRepository.findWithPostsByUserId(userId);
            return likes;
        } catch (error) {
            throw createHttpError(500, "Failed to get likes by user ID.");
        }
    },
});

export default likeService;
