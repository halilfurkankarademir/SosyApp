/**
 * @fileoverview Kullanıcı işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/userController
 */

import userDTO from "../dtos/userDTO.js";
import userService from "../services/userService.js";
import logger from "../utils/logger.js";

/**
 * @description Kullanıcı işlemleri için controller fonksiyonlarını içerir.
 * Gelen istekleri alır, ilgili servis fonksiyonunu çağırır ve yanıtı DTO ile formatlayarak döner.
 */
const userController = {
    /**
     * @description Tüm kullanıcıları listeler.
     * @route GET /users/
     */
    getAllUsers: async (req, res, next) => {
        try {
            logger.info("Getting all users...");
            const users = await userService.getAllUsers();
            // DTO ile hassas verileri filtrele
            const usersDTOInstance = users.map((user) => new userDTO(user));
            logger.info("Users fetched successfully");
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            logger.error("Error getting users:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Belirli bir kullanıcıyı ID ile getirir.
     * @route GET /users/id/:userId
     */
    getUserById: async (req, res, next) => {
        try {
            logger.info("Getting user...");
            const userId = req.params.userId;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            logger.info("User fetched successfully");
            const userDTOInstance = new userDTO(user);
            res.status(200).json(userDTOInstance);
        } catch (error) {
            logger.error("Error getting user:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Oturum açmış (mevcut) kullanıcıyı getirir.
     * @route GET /users/me
     */
    getCurrentUser: async (req, res, next) => {
        try {
            logger.info("Getting current user...");
            const userId = req.user.uid; // Kimlik doğrulama middleware'inden gelir
            const user = await userService.getUserById(userId);
            if (!user) {
                // Bu durum genellikle token geçerli ama kullanıcı DB'de yoksa olur
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const userDTOInstance = new userDTO(user);
            logger.info("Current user fetched successfully");
            res.status(200).json(userDTOInstance);
        } catch (error) {
            logger.error("Error getting current user:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Belirli bir kullanıcıyı e-posta adresi ile getirir.
     * @route GET /users/email/:email
     */
    getUserByEmail: async (req, res, next) => {
        try {
            logger.info("Getting user by email...");
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const userDTOInstance = new userDTO(user);
            logger.info("User fetched successfully");
            res.status(200).json(userDTOInstance);
        } catch (error) {
            logger.error("Error getting user by email:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Bir kullanıcının profil detaylarını kullanıcı adına göre getirir.
     * İstek yapan kullanıcının takip durumunu da içerebilir.
     * @route GET /users/username/:username
     */
    getUserProfileDetails: async (req, res, next) => {
        try {
            logger.info("Getting user profile details...");
            const username = req.params.username;
            const requestedUserId = req.user.uid; // İstek yapan kullanıcı
            const userProfile = await userService.getUserProfileDetails(
                username,
                requestedUserId
            );
            if (!userProfile) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const userDTOInstance = new userDTO(userProfile);
            logger.info("User profile details fetched successfully");
            res.status(200).json(userDTOInstance);
        } catch (error) {
            logger.error("Error getting user profile details:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Yeni bir kullanıcı oluşturur (Genellikle register endpoint'i ile ilişkilidir).
     * @route POST /users/ (veya /auth/register)
     */
    createUser: async (req, res, next) => {
        try {
            logger.info("Creating user...");
            const userData = req.body;

            const newUser = await userService.createUser(userData);

            const userDTOInstance = new userDTO(newUser);

            logger.info("User created successfully");

            res.status(201).json(userDTOInstance);
        } catch (error) {
            logger.error("Error creating user:", error);
            res.status(error.status || 500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Oturum açmış kullanıcının bilgilerini günceller.
     * @route PUT /users/me
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
            // Başarılı güncelleme sonrası güncellenmiş kullanıcıyı DTO ile dön
            const userDTOInstance = new userDTO(updatedUser);
            logger.info("User updated successfully");
            res.status(200).json(userDTOInstance);
        } catch (error) {
            logger.error("Error updating user:", error);
            res.status(error.status || 500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Oturum açmış kullanıcının hesabını siler.
     * @route DELETE /users/me
     */
    deleteUser: async (req, res, next) => {
        try {
            logger.info("Deleting user...");
            const userId = req.user.uid;
            await userService.deleteUser(userId);
            // Başarılı silme sonrası cookie'leri temizle ve onay mesajı dön
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            logger.info("User deleted successfully");
            res.status(200).json({ message: "Kullanıcı başarıyla silindi" }); // 204 No Content de olabilir
        } catch (error) {
            logger.error("Error deleting user:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },

    /**
     * @description Rastgele kullanıcıları getirir (Öneri vb. için). Aktif kullanıcı hariç tutulur.
     * @route GET /users/random
     */
    getRandomUsers: async (req, res, next) => {
        try {
            logger.info("Getting random users...");
            const requestedUserId = req.user.uid; // Aktif kullanıcıyı hariç tutmak için
            const users = await userService.getRandomUsers(requestedUserId);
            const usersDTOInstance = users.map((user) => new userDTO(user));
            logger.info("Random users fetched successfully");
            res.status(200).json(usersDTOInstance);
        } catch (error) {
            logger.error("Error getting random users:", error);
            res.status(500).json({ error: error.message });
            next(error);
        }
    },
};

export default userController;
