import { Op } from "@sequelize/core";
import { sendFollowNotification } from "./notificationService.js";
import createHttpError from "http-errors";

/**
 * Takip (follow) işlemleri için servis katmanı.
 */
const followService = (followRepository, userRepository) => ({
    /**
     * Bir kullanıcının başka bir kullanıcıyı takip etmesini sağlar.
     * Kendi kendini takip etmeyi engeller ve bildirim gönderir.
     * @param {string} followerId - Takip eden kullanıcının UUID'si.
     * @param {string} followingId - Takip edilecek kullanıcının UUID'si.
     * @returns {Promise<Follow>} Oluşturulan takip ilişkisi ('Follow' model örneği).
     */
    async followUser(followerId, followingId) {
        if (followerId === followingId) {
            throw createHttpError(400, "You cannot follow yourself.");
        }
        try {
            const existingFollow = await followRepository.findOne(
                followerId,
                followingId
            );
            if (existingFollow) {
                throw createHttpError(400, "User already follows this user.");
            }

            const follow = await followRepository.create(
                followerId,
                followingId
            );

            // Bildirim gönderme
            try {
                const followerUser = await userRepository.findUser({
                    where: { uid: followerId },
                    attributes: ["uid", "username", "profilePicture"],
                });
                if (followerUser)
                    sendFollowNotification(followerUser, followingId);
            } catch (error) {
                throw createHttpError(
                    500,
                    "Failed to send follow notification."
                );
            }

            return follow;
        } catch (error) {
            throw createHttpError(500, "Failed to follow user.");
        }
    },

    /**
     * Bir kullanıcının başka bir kullanıcıyı takipten çıkmasını sağlar.
     * @param {string} followerId - Takibi bırakan kullanıcının UUID'si.
     * @param {string} followingId - Takibi bırakılan kullanıcının UUID'si.
     * @returns {Promise<void>} İşlem başarılı olursa bir şey döndürmez.
     */
    async unfollowUser(followerId, followingId) {
        if (followerId === followingId) {
            throw createHttpError(400, "You cannot unfollow yourself.");
        }
        try {
            await followRepository.delete(followerId, followingId);
        } catch (error) {
            throw createHttpError(500, "Failed to unfollow user.");
        }
    },

    /**
     * Belirli bir kullanıcıyı takip eden tüm kullanıcıları (takipçileri) detaylarıyla getirir.
     * @param {string} userId - Takipçileri listelenecek kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip eden kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi.
     */
    async getFollowers(userId, filter) {
        try {
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
            throw createHttpError(500, "Failed to get followers.");
        }
    },

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıları detaylarıyla getirir.
     * @param {string} userId - Takip ettikleri listelenecek kullanıcının UUID'si.
     * @returns {Promise<Array<Follow>>} Takip edilen kullanıcı bilgilerini içeren 'Follow' model örneklerinin dizisi.
     */
    async getFollowing(userId, filter) {
        try {
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
            throw createHttpError(500, "Failed to get following list.");
        }
    },

    /**
     * Belirli bir kullanıcının takip ettiği tüm kullanıcıların ID'lerini bir dizi olarak getirir.
     * Genellikle başka sorgularda (örn: feed oluşturma) kullanılmak üzere optimize edilmiştir.
     * @param {string} userId - Takip eden kullanıcının UUID'si.
     * @returns {Promise<Array<string>>} Takip edilen kullanıcıların UUID'lerinin dizisi.
     */
    async getFollowingUsersId(userId) {
        try {
            return await followRepository.findFollowingIds(userId);
        } catch (error) {
            throw createHttpError(500, "Failed to get following IDs.");
        }
    },
});

export default followService;
