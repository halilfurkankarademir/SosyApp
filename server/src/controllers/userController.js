/**
 * Kullanıcı işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import createHttpError from "http-errors";
import diContainer from "../config/dependencyInjection.js";
import { clearAuthCookies } from "../utils/authHelper.js";
import { checkAdmin } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { userService } = diContainer;

/**
 * Kullanıcı işlemleri için controller fonksiyonlarını içerir.
 * Gelen istekleri alır, ilgili servis fonksiyonunu çağırır ve yanıtı DTO ile formatlayarak döner.
 */
const userController = {
    /**
     * Tüm kullanıcıları listeler. SADECE ADMIN
     */
    getAllUsers: async (req, res, next) => {
        try {
            const isAdmin = checkAdmin(req.user.role);
            if (!isAdmin) {
                throw createHttpError(403, "Access denied");
            }

            logger.info("Getting all users...");

            const users = await userService.getAllUsers();

            logger.info("Users fetched successfully");

            res.status(200).json(users);
        } catch (error) {
            logger.error("Error getting users:", error);
            next(error);
        }
    },

    /**
     * Belirli bir kullanıcıyı ID ile getirir. SADECE ADMIN
     */
    getUserById: async (req, res, next) => {
        try {
            const isAdmin = checkAdmin(req.user.role);
            if (!isAdmin) {
                throw createHttpError(403, "Access denied");
            }

            logger.info("Getting user...");

            const userId = req.params.userId;

            const user = await userService.getUserById(
                userId,
                isAdmin ? "admin" : "user"
            );

            logger.info("User fetched successfully");

            res.status(200).json(user);
        } catch (error) {
            logger.error("Error getting user:", error);
            next(error);
        }
    },

    /**
     *  Oturum açmış (mevcut) kullanıcıyı getirir.
     */
    getCurrentUser: async (req, res, next) => {
        try {
            logger.info("Getting current user...");

            const userId = req.user.uid;
            const permission = req.user.role;

            const user = await userService.getUserById(userId, permission);

            logger.info("Current user fetched successfully");

            res.status(200).json(user);
        } catch (error) {
            logger.error("Error getting current user:", error);
            next(error);
        }
    },

    /**
     *  Belirli bir kullanıcıyı e-posta adresi ile getirir.
     */
    getUserByEmail: async (req, res, next) => {
        try {
            logger.info("Getting user by email...");

            const email = req.params.email;

            const user = await userService.getUserByEmail(email);

            logger.info("User fetched successfully");

            res.status(200).json(user);
        } catch (error) {
            logger.error("Error getting user by email:", error);
            next(error);
        }
    },

    /**
     *  Bir kullanıcının profil detaylarını kullanıcı adına göre getirir.
     */
    getUserProfileDetails: async (req, res, next) => {
        try {
            logger.info("Getting user profile details...");

            const username = req.params.username;
            const requestedUserId = req.user.uid;

            const userProfile = await userService.getUserProfileDetails(
                username,
                requestedUserId,
                req.user
            );

            logger.info("User profile details fetched successfully");

            res.status(200).json(userProfile);
        } catch (error) {
            logger.error("Error getting user profile details:", error);
            next(error);
        }
    },

    /**
     * Yeni bir kullanıcı oluşturur (Genellikle register endpoint'i ile ilişkilidir).
     */
    createUser: async (req, res, next) => {
        try {
            logger.info("Creating user...");

            const userData = req.body;

            const createdUser = await userService.createUser(userData);

            logger.info("User created successfully");

            res.status(201).json(createdUser);
        } catch (error) {
            logger.error("Error creating user:", error);
            next(error);
        }
    },

    /**
     *  Oturum açmış kullanıcının bilgilerini günceller.
     */
    updateUserById: async (req, res, next) => {
        try {
            logger.info("Updating user...");

            const userId = req.user.uid;
            const updates = req.body;

            const updatedUser = await userService.updateUserById(
                userId,
                updates
            );

            logger.info("User updated successfully");

            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error("Error updating user:", error);
            next(error);
        }
    },

    /**
     * Oturum açmış kullanıcının hesabını siler.
     */
    deleteUser: async (req, res, next) => {
        try {
            logger.info("Deleting user...");

            const userId = req.user.uid;

            await userService.deleteUser(userId);

            clearAuthCookies(res);

            logger.info("User deleted successfully");
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
        } catch (error) {
            logger.error("Error deleting user:", error);
            next(error);
        }
    },

    /**
     *  Rastgele kullanıcıları getirir (Öneri vb. için). Aktif kullanıcı hariç tutulur.
     */
    getRandomUsers: async (req, res, next) => {
        try {
            logger.info("Getting random users...");

            const requestedUserId = req.user.uid;

            const users = await userService.getRandomUsers(requestedUserId);

            logger.info("Random users fetched successfully");

            res.status(200).json(users);
        } catch (error) {
            logger.error("Error getting random users:", error);
            next(error);
        }
    },
};

export default userController;
