import AdminProfileDTO from "../dtos/profileDTOs/AdminProfileDTO.js";
import OwnProfileDTO from "../dtos/profileDTOs/OwnProfileDTO.js";
import userDTO from "../dtos/userDTO.js";
import { ErrorMessages } from "../utils/constants.js";
import {
    getPermissionLevel,
    getUserDTOInstanceByPermissionLevel,
} from "../utils/helpers.js";
import logger from "../utils/logger.js";

/**
 * Kullanıcı (user) işlemleri için servis katmanı.
 */

const userService = (userRepository) => ({
    /**
     * Yeni kullanıcı oluşturur.
     * @param {Object} userData - Kayit icin gerekli verileri icerir:
     *   - email: Kullanicinin e-posta adresi.
     *   - password: Kullanicinin sifresi.
     *   - firstName: Kullanıcının adı.
     *   - lastName: Kullanıcının soyadı.
     *   - username: Kullanıcının kullanıcı adı.
     *
     * @returns {Promise<User>} Olusturulan kullanıcı bilgilerini donderir.
     */
    createUser: async (userData) => {
        try {
            logger.info("Creating user started");

            const createdUser = await userRepository.createUser({
                ...userData,
            });

            logger.info("User created successfully", {
                userId: createdUser.uid,
                email: createdUser.email,
                operation: "createUser",
            });

            const userDTOInstance = new OwnProfileDTO(createdUser);

            return userDTOInstance;
        } catch (error) {
            logger.error("User creation failed", {
                error: error.message,
                operation: "createUser",
            });
            throw new Error(ErrorMessages.USER_CREATION_FAILED);
        }
    },

    /**
     * Kullanıcı bilgilerini gunceller.
     * @param {number} userId - Guncellenecek kullanıcının ID'si.
     * @param {Object} updates - Guncellenecek verileri icerir.
     * @returns {Promise<User>} Guncellenen kullanıcı bilgilerini donderir.
     */
    updateUserById: async (userId, updates) => {
        try {
            logger.debug(`Updating user`, { userId });
            const user = await userRepository.findUser({
                where: { uid: userId },
            });
            if (!user) {
                logger.warn("User not found for update", { userId });
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            const updatedUser = await user.update(updates);

            logger.info(`User updated successfully`, {
                userId,
            });

            const userDTOInstance = new OwnProfileDTO(updatedUser);

            return userDTOInstance;
        } catch (error) {
            logger.error(`User update failed`, {
                userId,
                error: error.message,
            });
            throw new Error(ErrorMessages.USER_UPDATE_FAILED);
        }
    },

    /**
     * Kullanıcıyı ve ona ait tum verileri siler.
     * @param {string} userId - Silinecek kullanıcının ID'si.
     * @returns {Promise<void>} Başarılı silme işleminden sonra bir şey döndürmez.
     */
    deleteUser: async (userId) => {
        try {
            logger.debug(`Deleting user`, { userId });

            const user = await userRepository.findUser({
                where: { uid: userId },
            });
            if (!user) {
                logger.warn("User not found for deletion", { userId });
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            await user.destroy();

            logger.info(`User deleted successfully`, {
                userId,
            });
        } catch (error) {
            logger.error(`User deletion failed`, {
                userId,
                error: error.message,
            });
            throw new Error(ErrorMessages.USER_DELETION_FAILED);
        }
    },

    /**
     * Id'si verilen kullanıcıyı donderir.
     * @param {string} userId - Getirilecek kullanıcının ID'si.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     */
    getUserById: async (userId, permission) => {
        try {
            logger.info(`Fetching user by ID`, { userId });
            const user = await userRepository.findUser({
                where: { uid: userId },
            });

            if (!user) {
                logger.warn("User not found", { userId });
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            logger.info(`Successfully retrieved user by ID`, {
                userId,
                operation: "getUserById",
            });

            let userDTOInstance;

            if (permission === "admin")
                userDTOInstance = new AdminProfileDTO(user);
            else userDTOInstance = new OwnProfileDTO(user);

            return userDTOInstance;
        } catch (error) {
            logger.error(` failed to fetch user by ID`, {
                userId,
                error: error.message,
                operation: "getUserById",
            });
            throw new Error(ErrorMessages.USER_NOT_FOUND);
        }
    },

    /**
     * Kullanıcı adı verilen kullanıcıyı donderir.
     * @param {string} username - Getirilecek kullanıcının kullanıcı adı.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     */
    getUserByUsername: async (username) => {
        try {
            logger.info(`Fetching user by username`, { username });
            const user = await userRepository.findUser({
                where: { username },
            });

            if (!user) {
                logger.warn("User not found", { username });
                throw new Error(ErrorMessages.USER_NOT_FOUND_WITH_USERNAME);
            }

            logger.info(`Successfully retrieved user by username`, {
                username,
                operation: "getUserByUsername",
            });

            return user;
        } catch (error) {
            logger.error(` failed to fetch user by username`, {
                username,
                error: error.message,
                operation: "getUserByUsername",
            });
            throw new Error(ErrorMessages.USER_NOT_FOUND_WITH_USERNAME);
        }
    },

    /**
     * Email ile kullanıcıyı donderir.
     * @param {string} email - Getirilecek kullanıcının email'i.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     */
    getUserByEmail: async (email) => {
        try {
            logger.info("Fetching user by email", { email });

            const user = await userRepository.findUser({
                where: { email },
            });

            if (!user) {
                logger.warn("User not found", { email });
                throw new Error(ErrorMessages.USER_NOT_FOUND_WITH_EMAIL);
            }

            logger.info("Successfully retrieved user by email", {
                email,
                operation: "getUserByEmail",
            });

            return user;
        } catch (error) {
            logger.error("Error fetching user by email", {
                error: error.message,
                operation: "getUserByEmail",
                email,
            });
            throw new Error(ErrorMessages.USER_NOT_FOUND_WITH_EMAIL);
        }
    },

    /**
     * Kullanici adi verilen kullanicinin profil bilgilerini donderir.
     * @param {string} username - Getirilecek kullanıcının kullanıcı adı.
     * @param {string} requestedUserId - Istegi yapan kullanıcının ID'si.
     * @returns {Promise<User>} Kullanici adi verilen kullanicinin profil bilgilerini donderir.
     */
    getUserProfileDetails: async (username, requestedUserId, requestedUser) => {
        try {
            logger.debug("Fetching user profile details by username", {
                username,
            });
            const user = await userRepository.findUser({
                where: { username },
            });
            if (!user) {
                logger.warn("User not found", { username });
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            const userData = user.get ? user.get({ plain: true }) : user;

            const followerCount = userData.Followers.length;
            const followingCount = userData.Following.length;
            const postsCount = userData.posts.length;
            const isOwnProfile = userData.uid === requestedUserId;

            const isFollowing = userData.Followers.some(
                (follower) => follower.uid === requestedUserId
            );

            const updatedUser = {
                ...userData,
                followerCount,
                followingCount,
                postsCount,
                isOwnProfile,
                isFollowing,
            };

            const userDTOInstance = new userDTO(updatedUser);

            return userDTOInstance;
        } catch (error) {
            logger.error("Error fetching user by username", {
                error: error.message,
                operation: "getUserByUsername",
                username,
            });
            throw new Error(ErrorMessages.USER_NOT_FOUND_WITH_USERNAME);
        }
    },

    /**
     * 5 adet rastgele kullanıcı getirir
     * @returns  {Promise<User[]>} Kullanıcı modellerini içeren bir dizi döndürür.
     */
    getRandomUsers: async (requestedUserId) => {
        try {
            const userLimit = 5;
            const users = await userRepository.getRandomUsers(
                userLimit,
                requestedUserId
            );

            const usersDTOInstance = users.map((user) => new userDTO(user));

            return usersDTOInstance || [];
        } catch (error) {
            logger.error("Error getting random users:", error);
            return undefined;
        }
    },
});

export default userService;
