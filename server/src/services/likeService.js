import sequelize from "../config/sequelize.js";
import logger from "../utils/logger.js";

/**
 * Beğeni (like) işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace likeService
 */
const likeService = (likeRepository, postRepository) => ({
    /**
     * Bir kullanıcının bir gönderiyi beğenmesini sağlar.
     * Repository üzerinden yeni bir beğeni kaydı oluşturur.
     * @memberof likeService
     * @param {string} userId - Beğeniyi yapan kullanıcının ID'si.
     * @param {number} postId - Beğenilen gönderinin ID'si.
     * @returns {Promise<Like>} Oluşturulan beğeni kaydı nesnesi.
     * @throws {Error} Beğeni oluşturma işlemi sırasında bir hata oluşursa.
     */
    async createLike(userId, postId) {
        const t = await sequelize.startUnmanagedTransaction();
        try {
            const existingLike = await likeRepository.findOneByUserIdAndPostId(
                userId,
                postId
            );

            if (existingLike) {
                await t.commit(); // Henüz bir yazma yapılmadı, commit edip çıkabiliriz
                // Veya rollback yapıp hata da fırlatabilirsiniz.
                // Senaryonuza göre karar verin.
                logger.info(
                    `Like already exists for user ${userId} on post ${postId}. Returning existing like.`
                );
                return existingLike;
            }

            await postRepository.incrementLikeCount(postId, t);

            const like = await likeRepository.create(userId, postId, t);

            await t.commit(); // Tüm işlemler başarılıysa commit
            return like;
        } catch (error) {
            await t.rollback(); // Hata durumunda rollback
            logger.error("likeService createLike error:", error);
            throw new Error("Beğeni oluşturulamadı: " + error.message);
        }
    },

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
            logger.error("likeService deleteLike error:", error);
            throw new Error("Beğeni silinemedi: " + error.message);
        }
    },

    /**
     * Belirli bir gönderiye ait tüm beğenileri getirir.
     * Repository üzerinden ilgili gönderinin beğenilerini sorgular.
     * @memberof likeService
     * @param {number} postId - Beğenileri getirilecek gönderinin ID'si.
     * @returns {Promise<Array<Like>>} Belirtilen gönderiye ait beğeni kayıtlarının dizisi.
     * @throws {Error} Beğenileri getirme işlemi sırasında bir hata oluşursa.
     */
    async getAllLikes(postId) {
        try {
            const likes = await likeRepository.findByPostId(postId);
            return likes;
        } catch (error) {
            throw new Error("Error getting likes: " + error.message);
        }
    },

    /**
     * Belirli bir kullanıcının yaptığı tüm beğenileri (ilişkili gönderi bilgileriyle birlikte) getirir.
     * Repository üzerinden kullanıcı ID'sine göre sorgulama yapar.
     * @memberof likeService
     * @param {string} userId - Beğenileri getirilecek kullanıcının ID'si.
     * @returns {Promise<Array<Post>>} Kullanıcının yaptığı beğeni kayıtlarının dizisi.
     * @throws {Error} Kullanıcının beğenilerini getirme işlemi sırasında bir hata oluşursa.
     */
    async getLikesByUserId(userId) {
        try {
            const likes = await likeRepository.findWithPostsByUserId(userId);
            return likes;
        } catch (error) {
            throw new Error("Error getting likes by user ID: " + error.message);
        }
    },
});

export default likeService;
