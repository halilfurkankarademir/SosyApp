import { fn, Op } from "@sequelize/core";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Follow from "../models/followModel.js";
import logger from "../utils/logger.js";

/**
 * Standart iliskili verileri (Posts, Following, Followers)
 * kullanici sorgularina dahil etmek icin kullanilan yapilandirma.
 * Sadece ID'leri getirir.
 */
const standartIncludes = [
    {
        model: Post,
        attributes: ["id"], // Post sadece ID'si ile
    },
    {
        model: User,
        as: "Following", // Takip edilenler (sadece ID)
        attributes: ["uid"],
    },
    {
        model: User,
        as: "Followers", // Takipçiler (sadece ID)
        attributes: ["uid"],
    },
];

export default {
    /**
     * Belirtilen seçeneklere göre tek bir kullanıcıyı bulur.
     * Her zaman standart ilişkili verileri (Posts, Followers, Following ID'leri) içerir.
     * @param {object} options - Sequelize findOne seçenekleri (örn. { where: { uid: '...' } }).
     * @returns {Promise<User|null>} Bulunan User modelini veya null döndürür. Hata durumunda konsola log basar ve undefined dönebilir.
     */
    async findUser(options = {}) {
        try {
            return await User.findOne({
                ...options,
                include: standartIncludes,
            });
        } catch (error) {
            logger.error("Error finding user in repository:", error);
            return undefined;
        }
    },

    /**
     * Verilen verilerle yeni bir kullanıcı oluşturur.
     * @param {object} userData - Yeni kullanıcı için veriler (örn. email, password, username).
     * @returns {Promise<User>} Oluşturulan User modelini döndürür.
     */
    async createUser(userData) {
        try {
            return await User.create(userData);
        } catch (error) {
            logger.error("Error creating user in repository:", error);
            return undefined;
        }
    },

    /**
     * Belirtilen ID'ye sahip kullanıcıyı günceller.
     * @param {string} userId - Güncellenecek kullanıcının ID'si (uid).
     * @param {object} updates - Uygulanacak güncellemeler.
     * @returns {Promise<number>} Etkilenen satır sayısını döndürür (genellikle 0 veya 1).
     */
    async update(userId, updates) {
        try {
            return await User.update(updates, { where: { uid: userId } });
        } catch (error) {
            logger.error("Error updating user in repository:", error);
            return undefined;
        }
    },

    /**
     * Belirtilen ID'ye sahip kullanıcıyı siler.
     * @param {string} userId - Silinecek kullanıcının ID'si (uid).
     * @returns {Promise<number>} Silinen satır sayısını döndürür (genellikle 0 veya 1).
     */
    async delete(userId) {
        try {
            return User.destroy({ where: { uid: userId } });
        } catch (error) {
            logger.error("Error deleting user in repository:", error);
            return undefined;
        }
    },

    /**
     * Tüm kullanıcıları (varsayılan olarak limitli/sayfalı) getirir.
     * @param {object} [options={}] - Seçenekler (örn. { limit: 20, offset: 0 }).
     * @returns {Promise<User[]>} Kullanıcı modellerini içeren bir dizi döndürür.
     */
    async getAll(options = {}) {
        try {
            return User.findAndCountAll({
                ...options,
                include: standartIncludes,
                distinct: true,
                order: [["role", "ASC"]],
            });
        } catch (error) {
            logger.error("Error getting all users in repository:", error);
            return undefined;
        }
    },

    /**
     * Istenilen sayida rastgele kullanıcı getirir
     * Kullanicinin kendisi ve takip ettikleri kullanicilar haricindeki kullanicilari getirir
     * @param {number} limit - Kullanıcı sayısı
     * @param {string} requestedUserId - Istegi yapan kullanıcının ID'si
     * @returns {Promise<User[]>} Kullanıcı modellerini içeren bir dizi döndürür.
     */
    async getRandomUsers(limit, requestedUserId) {
        try {
            // Kullanicinin takip ettigi kullanicilarin IDlerini al
            const followeUserIds = await Follow.findAll({
                where: { followerId: requestedUserId },
            }).then((follows) => follows.map((follow) => follow.followingId));

            // Kullanicinin kendisi ve takip ettikleri kullanicilar haricinde rastgele kullanicilari getir
            return User.findAll({
                order: [fn("RANDOM")],
                limit,
                where: {
                    uid: {
                        [Op.ne]: requestedUserId,
                        [Op.notIn]: followeUserIds,
                    },
                },
            });
        } catch (error) {
            logger.error("Error getting random users in repository:", error);
            return undefined;
        }
    },

    /**
     * Tüm kullanıcıların sayısını getirir.
     * @returns {Promise<number>} Kullanıcı sayısını döndürür.
     */
    async getUserCount() {
        try {
            return User.count();
        } catch (error) {
            logger.error("Error getting user count in repository:", error);
            return undefined;
        }
    },

    /**
     * Son 24 saat içinde giriş yapan kullanıcıların sayısını getirir.
     * @returns {Promise<number>} Son 24 saat içinde giriş yapan kullanıcı sayısını döndürür.
     */
    async getRecentUsersCount() {
        try {
            const now = new Date();
            const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Son 24 saat
            return await User.count({
                where: {
                    lastLoginAt: {
                        [Op.gte]: last24Hours, // Son 24 saat içinde oluşturulan kullanıcılar
                    },
                },
            });
        } catch (error) {
            logger.error("Error getting recent users in repository:", error);
            return undefined;
        }
    },
};
