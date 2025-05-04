import { Op } from "@sequelize/core";
import logger from "../utils/logger.js";
import { sendFollowNotification } from "./notificationService.js"; // Bildirim için

/**
 * Takip (follow) işlemleri için servis katmanı.
 * @namespace followService
 */
const followService = (followRepository, userRepository) => ({
    /**
     * Bir kullanıcının başka bir kullanıcıyı takip etmesini sağlar.
     * Kendi kendini takip etmeyi engeller ve bildirim gönderir.
     * @memberof followService
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @param {string} followingId - Takip edilecek kullanıcının UUID'si.
     * @returns {Promise<Follow>} Oluşturulan takip ilişkisi ('Follow' model örneği).
     * @throws {Error} Kullanıcı kendini takip etmeye çalışırsa veya veritabanı hatası olursa.
     */
    async followUser(followerId, followingId) {
        if (followerId === followingId) {
            logger.warn(`User ${followerId} attempted to follow themselves.`);
            throw new Error("Users cannot follow themselves.");
        }
        try {
            logger.info(
                `User ${followerId} attempting to follow ${followingId}`
            );
            // Opsiyonel: Zaten takip ediyor mu diye kontrol et
            const existingFollow = await followRepository.findOne(
                followerId,
                followingId
            );
            if (existingFollow) {
                logger.info(
                    `User ${followerId} already follows ${followingId}.`
                );
                return existingFollow; // Hata vermek yerine mevcut ilişkiyi döndür
            }

            const follow = await followRepository.create(
                followerId,
                followingId
            );
            logger.info(
                `User ${followerId} successfully followed ${followingId}`
            );

            // Bildirim gönderme (Arka planda asenkron çalışabilir)
            userRepository
                .findUser({
                    where: { uid: followerId },
                    attributes: ["uid", "username", "profilePicture"],
                })
                .then((followerUser) => {
                    if (followerUser) {
                        sendFollowNotification(followerUser, followingId);
                    } else {
                        logger.error(
                            `Could not find follower user ${followerId} to send notification.`
                        );
                    }
                })
                .catch((err) => {
                    logger.error(
                        `Error fetching follower user data for notification: ${err.message}`
                    );
                });

            return follow;
        } catch (error) {
            logger.error(
                `Error during follow operation (${followerId} -> ${followingId}): ${error.message}`
            );
            throw new Error("Failed to follow user.");
        }
    },

    /**
     * Bir kullanıcının başka bir kullanıcıyı takipten çıkmasını sağlar.
     * @memberof followService
     * @param {string} followerId - Takibi bırakan kullanıcının UUID'si.
     * @param {string} followingId - Takibi bırakılan kullanıcının UUID'si.
     * @returns {Promise<void>} İşlem başarılı olursa bir şey döndürmez.
     * @throws {Error} Takibi bırakma sırasında bir hata oluşursa.
     */
    async unfollowUser(followerId, followingId) {
        if (followerId === followingId) {
            // Bu durum genellikle UI tarafından engellenir ama yine de kontrol etmek iyidir.
            logger.warn(`User ${followerId} attempted to unfollow themselves.`);
            return; // Hata vermek yerine sessizce çıkılabilir.
        }
        try {
            logger.info(
                `User ${followerId} attempting to unfollow ${followingId}`
            );
            const deletedCount = await followRepository.delete(
                followerId,
                followingId
            );
            if (deletedCount > 0) {
                logger.info(
                    `User ${followerId} successfully unfollowed ${followingId}`
                );
            } else {
                logger.warn(
                    `Follow relationship not found or already removed for ${followerId} -> ${followingId}`
                );
            }
        } catch (error) {
            logger.error(
                `Error during unfollow operation (${followerId} -> ${followingId}): ${error.message}`
            );
            throw new Error("Failed to unfollow user.");
        }
    },

    /**
     * Takip edilen bir kullanıcının, kendisini takip eden birini takipçilerinden çıkarmasını sağlar.
     * Teknik olarak unfollow ile aynıdır, ancak farklı bir iş akışını temsil edebilir.
     * @memberof followService
     * @param {string} followerId - Takipçilikten çıkarılacak kullanıcının UUID'si.
     * @param {string} followingId - Takipçiyi çıkaran (takip edilen) kullanıcının UUID'si.
     * @returns {Promise<void>} İşlem başarılı olursa bir şey döndürmez.
     * @throws {Error} Takipçi çıkarma sırasında bir hata oluşursa.
     */
    async removeFollower(followerId, followingId) {
        // Bu işlem unfollow ile aynı db işlemini yapar: followerId'nin followingId'yi takip etme kaydını siler.
        if (followerId === followingId) {
            logger.warn(
                `User ${followingId} attempted to remove themselves as a follower (which is illogical).`
            );
            return;
        }
        try {
            logger.info(
                `User ${followingId} attempting to remove follower ${followerId}`
            );
            // Dikkat: Parametrelerin sırası `delete` fonksiyonu için önemlidir.
            const deletedCount = await followRepository.delete(
                followerId,
                followingId
            );
            if (deletedCount > 0) {
                logger.info(
                    `User ${followingId} successfully removed follower ${followerId}`
                );
            } else {
                logger.warn(
                    `Follower relationship not found or already removed for follower ${followerId} of user ${followingId}`
                );
            }
            return deletedCount;
        } catch (error) {
            logger.error(
                `Error during remove follower operation (follower ${followerId}, user ${followingId}): ${error.message}`
            );
            throw new Error("Failed to remove follower.");
        }
    },

    /**
     * Belirli bir kullanıcıyı takip eden tüm kullanıcıları (takipçileri) detaylarıyla getirir.
     * Not: `getFollowersById` ile aynı işlevi görür, biri kaldırılabilir.
     * @memberof followService
     * @param {string} userId - Takipçileri listelenecek kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip eden kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi.
     * @throws {Error} Takipçileri getirirken bir hata oluşursa.
     */
    async getFollowers(userId, filter) {
        try {
            logger.info(`Fetching followers for user ${userId}`);

            const userFilter = {
                [Op.or]: {
                    username: { [Op.iLike]: `%${filter}%` },
                    firstName: { [Op.iLike]: `%${filter}%` },
                    lastName: { [Op.iLike]: `%${filter}%` },
                },
            };

            return await followRepository.findFollowersWithDetails(
                userId,
                userFilter
            );
        } catch (error) {
            logger.error(
                `Error getting followers for user ${userId}: ${error.message}`
            );
            throw new Error("Failed to get followers.");
        }
    },

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıları detaylarıyla getirir.
     * Not: `getFollowingById` ile aynı işlevi görür, biri kaldırılabilir.
     * @memberof followService
     * @param {string} userId - Takip ettikleri listelenecek kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip edilen kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi.
     * @throws {Error} Takip edilenleri getirirken bir hata oluşursa.
     */
    async getFollowing(userId, filter) {
        try {
            logger.debug(`Fetching following list for user ${userId}`);

            const userFilter = {
                [Op.or]: {
                    username: { [Op.iLike]: `%${filter}%` },
                    firstName: { [Op.iLike]: `%${filter}%` },
                    lastName: { [Op.iLike]: `%${filter}%` },
                },
            };

            return await followRepository.findFollowingWithDetails(
                userId,
                userFilter
            );
        } catch (error) {
            logger.error(
                `Error getting following list for user ${userId}: ${error.message}`
            );
            throw new Error("Failed to get following list.");
        }
    },

    // getFollowersById ve getFollowingById fonksiyonları getFollowers ve getFollowing
    // ile aynı olduğundan kaldırıldı. Eğer farklı bir amaçları varsa yeniden eklenebilirler.

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıların ID'lerini bir dizi olarak getirir.
     * Genellikle başka sorgularda (örn: feed oluşturma) kullanılmak üzere optimize edilmiştir.
     * @memberof followService
     * @param {string} userId - Takip eden kullanıcının UUID'si.
     * @returns {Promise<Array<string>>} Takip edilen kullanıcıların UUID'lerinin dizisi.
     * @throws {Error} ID'leri getirirken bir hata oluşursa.
     */
    async getFollowingUsersId(userId) {
        try {
            logger.debug(`Fetching following IDs for user ${userId}`);
            return await followRepository.findFollowingIds(userId);
        } catch (error) {
            logger.error(
                `Error getting following IDs for user ${userId}: ${error.message}`
            );
            throw new Error("Failed to get following user IDs.");
        }
    },
});

export default followService;
