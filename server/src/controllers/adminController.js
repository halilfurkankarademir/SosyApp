import diContainer from "../config/dependencyInjection.js";
import { getFilters, getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { adminService } = diContainer;

/**
 * Admin paneli için controller fonksiyonlarını içerir.
 */

const adminController = {
    /**
     * Admin paneli için gerekli olan dashboard verilerini alır.
     */
    getDashboardDatas: async (req, res, next) => {
        try {
            logger.info("Admin dashboard datas requested.");

            const dashboardDatas = await adminService.getDashboardDatas();

            logger.info("Admin dashboard datas fetched successfully.");

            res.status(200).json(dashboardDatas);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Admin paneli duzeyinde tüm kullanıcıları alır.
     */
    getAllUsers: async (req, res, next) => {
        try {
            logger.info("Admin all users requested.");

            const { limit, offset } = getPagination(
                req.query.page || 1,
                req.query.limit || 10
            );

            const { filterQuery } = getFilters(req.query.filter);

            const users = await adminService.getAllUsers(
                limit,
                offset,
                filterQuery
            );

            logger.info("Admin all users fetched successfully.");

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Admin paneli duzeyinde tüm gönderileri alır.
     */
    getAllPosts: async (req, res, next) => {
        try {
            logger.info("Admin all posts requested.");

            const { limit, offset } = getPagination(
                req.query.page || 1,
                req.query.limit || 20
            );

            const { filterQuery } = getFilters(req.query.filter);

            const posts = await adminService.getAllPosts(
                limit,
                offset,
                filterQuery
            );

            logger.info("Admin all posts fetched successfully.");

            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Admin paneli duzeyinde tüm yorumları alır.
     */
    getAllComments: async (req, res, next) => {
        try {
            logger.info("Admin all comments requested.");

            const { limit, offset } = getPagination(
                req.query.page || 1,
                req.query.limit || 10
            );

            const { filterQuery } = getFilters(req.query.filter);

            const comments = await adminService.getAllComments(
                limit,
                offset,
                filterQuery
            );

            logger.info("Admin all comments fetched successfully.");

            res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Uygulama ayarlarını alır. Ornek olarak, bakım modunu kontrol eder.
     */
    getAppSettings: async (req, res, next) => {
        try {
            logger.info("Admin app settings requested.");

            const appSettings = await adminService.getAppSettings();

            logger.info("Admin app settings fetched successfully.");

            res.status(200).json(appSettings);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Uygulama bakimda mi kontrol eder.
     */
    checkMaintenance: async (req, res, next) => {
        try {
            logger.info("Checking maintenance mode.");

            const isMaintenanceMode = await adminService.checkMaintenance();

            logger.info("Maintenance mode checked successfully.");

            res.status(200).json({ isMaintenanceMode });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Uygulama ayarlarını günceller.
     */
    updateAppSettings: async (req, res, next) => {
        try {
            const settings = req.body;

            console.log(settings);

            logger.info("Admin updating app settings.");

            const updatedSettings = await adminService.updateAppSettings(
                settings
            );

            logger.info("Admin app settings updated successfully.");

            res.status(200).json(updatedSettings);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Kullanıcı rolünü günceller.
     */
    updateUserRole: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            logger.info(`Admin updating user role for userId: ${userId}`);

            const updatedUser = await adminService.updateUserRole(userId, role);

            logger.info(`User role updated successfully for userId: ${userId}`);

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    },

    /**
     * Gonderi siler.
     */
    deletePost: async (req, res, next) => {
        try {
            const { postId } = req.params;

            logger.info(`Admin deleting post with postId: ${postId}`);

            await adminService.deletePost(postId);

            logger.info(`Post deleted successfully with postId: ${postId}`);

            res.status(200).json({ message: "Post deleted successfully." });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Yorum siler.
     */
    deleteComment: async (req, res, next) => {
        try {
            const { commentId } = req.params;

            logger.info(`Admin deleting comment with commentId: ${commentId}`);

            await adminService.deleteComment(commentId);

            logger.info(
                `Comment deleted successfully with commentId: ${commentId}`
            );

            res.status(200).json({ message: "Comment deleted successfully." });
        } catch (error) {
            next(error);
        }
    },
};

export default adminController;
