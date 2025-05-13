import createHttpError from "http-errors";
import AdminProfileDTO from "../dtos/profileDTOs/AdminProfileDTO.js";
import logger from "../utils/logger.js";
import { Op } from "@sequelize/core";

/**
 * Admin paneli için service fonksiyonlarını içerir.
 */
const adminService = (
    userRepository,
    postRepository,
    commentRepository,
    appSettingsRepository
) => ({
    /**
     * Admin paneli için gerekli olan dashboard verilerini alır.
     * @returns {Promise<Object>} Dashboard verileri.
     */
    getDashboardDatas: async () => {
        try {
            const userCount = await userRepository.getUserCount();
            const postCount = await postRepository.getPostCount();
            const commentCount = await commentRepository.getCommentCount();

            const recentUserCount = await userRepository.getRecentUsersCount();

            const data = {
                userCount,
                postCount,
                commentCount,
                recentUserCount,
            };

            return data;
        } catch (error) {
            throw createHttpError(500, "Failed to get dashboard datas.");
        }
    },
    /**
     * Admin paneli düzeyinde tüm kullanıcıları alır.
     * @returns {Promise<AdminProfileDTO[]>} Kullanıcılar.
     */
    getAllUsers: async (limit, offset, filterQuery) => {
        try {
            const userFilters = {
                [Op.or]: [
                    { username: { [Op.iLike]: `%${filterQuery}%` } },
                    { firstName: { [Op.iLike]: `%${filterQuery}%` } },
                    { lastName: { [Op.iLike]: `%${filterQuery}%` } },
                ],
            };

            const { rows: users, count } = await userRepository.getAll({
                where: userFilters,
                limit: limit,
                offset: offset,
            });

            logger.info(users[0].dataValues.user);

            const usersDTOInstance = users.map(
                (user) => new AdminProfileDTO(user)
            );

            return { users: usersDTOInstance, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get all users.");
        }
    },
    /**
     * Admin paneli düzeyinde tüm gönderileri alır.
     * @returns {Promise<Post[]>} Gönderiler.
     */
    getAllPosts: async (limit, offset, filterQuery) => {
        try {
            const postFilters = {
                [Op.or]: [{ content: { [Op.iLike]: `%${filterQuery}%` } }],
            };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postFilters,
                limit: limit,
                offset: offset,
            });

            return { posts, count };
        } catch (error) {
            throw createHttpError(500, "Failed to get all posts.");
        }
    },

    /**
     * Admin paneli düzeyinde tüm yorumları alır.
     * @returns {Promise<Comment[]>} Yorumlar.
     */
    getAllComments: async (limit, offset, filterQuery) => {
        try {
            const commentFilters = {
                [Op.or]: [{ content: { [Op.iLike]: `%${filterQuery}%` } }],
            };

            const { rows: comments, count } = await commentRepository.getAll({
                where: commentFilters,
                limit: limit,
                offset: offset,
            });

            // Post bilgileri olmayan yorumları filtrele
            const notNullComments = comments.filter(
                (comment) => comment.post !== null && comment !== undefined
            );

            return {
                comments: notNullComments,
                count,
            };
        } catch (error) {
            logger.error("Error getting all comments:", error);
            throw createHttpError(500, "Failed to get all comments.");
        }
    },

    /**
     * Admin paneli düzeyinde uygulama ayarlarını alır.
     * @returns {Promise<AppSettings>} Uygulama ayarları.
     */
    getAppSettings: async () => {
        try {
            const settings = await appSettingsRepository.getAppSettings();

            if (!settings) {
                throw createHttpError(404, "Settings not found.");
            }

            return settings;
        } catch (error) {
            throw createHttpError(500, "Failed to get app settings.");
        }
    },

    /**
     * Bakım modunu kontrol eder.
     * @returns {Promise<boolean>} Bakım modunda olup olmadığını döner.
     */
    checkMaintenance: async () => {
        try {
            const settings = await appSettingsRepository.getAppSettings();

            if (!settings) {
                throw createHttpError(404, "Settings not found.");
            }

            return settings.isMaintenanceMode;
        } catch (error) {
            throw createHttpError(500, "Failed to check maintenance mode.");
        }
    },
    /**
     * Uygulama ayarlarını günceller.
     * @param {Object} settings - Güncellenecek ayarlar.
     * @returns {Promise<AppSettings>} Güncellenmiş uygulama ayarları.
     */
    updateAppSettings: async (settings) => {
        try {
            const updatedSettings =
                await appSettingsRepository.updateAppSettings(settings);

            if (!updatedSettings) {
                throw createHttpError(404, "Settings not found.");
            }

            return updatedSettings;
        } catch (error) {
            throw createHttpError(500, "Failed to update app settings.");
        }
    },

    /**
     * Kullanıcı rolünü günceller.
     * @param {string} userId - Kullanıcı ID'si.
     * @param {string} newRole - Yeni rol.
     * @returns {Promise<User>} Güncellenmiş kullanıcı.
     */
    updateUserRole: async (userId, newRole) => {
        try {
            const user = await userRepository.findUser({
                where: { uid: userId },
            });

            if (!user) {
                throw createHttpError(404, "User not found.");
            }

            if (user.role === newRole) {
                throw createHttpError(400, "User already has this role.");
            }

            await userRepository.update(userId, {
                role: newRole,
            });

            return user;
        } catch (error) {
            throw createHttpError(500, "Failed to update user role.");
        }
    },

    /**
     * Kullanıcıyı siler.
     * @param {string} userId - Silinecek Kullanıcı ID'si.
     * @param {string} userRole - Kullanıcının rolü.
     * @returns {Promise<void>} Silme işlemi tamamlandığında döner.
     */
    deleteUser: async (userId, userRole) => {
        try {
            if (!userId) {
                throw createHttpError(400, "User ID is required.");
            }

            if (userRole === "admin") {
                throw createHttpError(403, "Cannot delete admin user.");
            }

            await userRepository.delete(userId);

            return { message: "User deleted successfully." };
        } catch (error) {
            console.error("Error deleting user:", error);
            throw createHttpError(500, "Failed to delete user.");
        }
    },

    /**
     * Gonderiyi siler.
     * @param {string} postId - Gönderi ID'si.
     * @returns {Promise<void>} Silme işlemi tamamlandığında döner.
     */
    deletePost: async (postId) => {
        try {
            if (!postId) {
                throw createHttpError(400, "Post ID is required.");
            }

            await postRepository.deleteById(postId);

            return { message: "Post deleted successfully." };
        } catch (error) {
            throw createHttpError(500, "Failed to delete post.");
        }
    },
    /**
     * Yorumu siler.
     * @param {string} commentId - Yorum ID'si.
     * @returns {Promise<void>} Silme işlemi tamamlandığında döner.
     */
    deleteComment: async (commentId) => {
        try {
            if (!commentId) {
                throw createHttpError(400, "Comment ID is required.");
            }

            await commentRepository.deleteComment(commentId);

            return { message: "Comment deleted successfully." };
        } catch (error) {
            throw createHttpError(500, "Failed to delete comment.");
        }
    },
});

export default adminService;
