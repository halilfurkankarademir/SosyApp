import { ErrorMessages } from "../utils/constants.js";
import logger from "../utils/logger.js";

/**
 * Kullanıcı (user) işlemleri için servis katmanı.
 * Repository katmanını kullanarak iş mantığını yürütür.
 * @namespace userService
 */

const userService = (userRepository) => ({
    /**
     * Yeni kullanıcı oluşturur.
     * @memberof userService
     * @param {Object} userData - Kayit icin gerekli verileri icerir:
     *   - email: Kullanicinin e-posta adresi.
     *   - password: Kullanicinin sifresi.
     *   - firstName: Kullanıcının adı.
     *   - lastName: Kullanıcının soyadı.
     *   - username: Kullanıcının kullanıcı adı.
     *
     * @returns {Promise<User>} Olusturulan kullanıcı bilgilerini donderir.
     *
     * @throws {Error} Kullanici olusturulurken bir hata olusursa hatayi donderir.
     */
    createUser: async (userData) => {
        try {
            logger.info("Creating user started");

            const newUser = await userRepository.createUser({
                ...userData,
            });

            logger.info("User created successfully", {
                userId: newUser.uid,
                email: newUser.email,
                operation: "createUser",
            });

            return newUser;
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
     * @memberof userService
     * @param {number} userId - Guncellenecek kullanıcının ID'si.
     * @param {Object} updates - Guncellenecek verileri icerir.
     * @returns {Promise<User>} Guncellenen kullanıcı bilgilerini donderir.
     * @throws {Error} Kullanici guncellenirken bir hata olusursa hatayi donderir.
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

            return updatedUser;
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
     * @memberof userService
     * @param {string} userId - Silinecek kullanıcının ID'si.
     * @returns {Promise<void>} Başarılı silme işleminden sonra bir şey döndürmez.
     * @throws {Error} Kullanici silinirken bir hata olusursa hatayi donderir.
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
     * Kayitli tum kullanıcıları donderir.
     * @memberof userService
     * @returns {Promise<Array<User>>} Kayitli tum kullanıcıları içeren bir dizi donderir.
     * @throws {Error} Kullanicilar getirilirken bir hata olusursa hatayi donderir.
     */
    getAllUsers: async () => {
        try {
            logger.debug("Fetching all users started");

            const users = await userRepository.getAll();

            logger.info("All users fetched successfully", {
                operation: "getAllUsers",
            });

            return users;
        } catch (error) {
            logger.error("Failed to fetch all users", {
                error: error.message,
                operation: "getAllUsers",
            });
            throw new Error(ErrorMessages.USERS_NOT_FOUND);
        }
    },

    /**
     * Id'si verilen kullanıcıyı donderir.
     * @memberof userService
     * @param {string} userId - Getirilecek kullanıcının ID'si.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     * @throws {Error} Kullanici getirilirken bir hata olusursa hatayi donderir.
     */
    getUserById: async (userId) => {
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

            return user;
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
     * @memberof userService
     * @param {string} username - Getirilecek kullanıcının kullanıcı adı.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     * @throws {Error} Kullanici getirilirken bir hata olusursa hatayi donderir.
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
     * @memberof userService
     * @param {string} email - Getirilecek kullanıcının email'i.
     * @returns {Promise<User>} Bulunan kullanıcı nesnesini donderir.
     * @throws {Error} Kullanici getirilirken bir hata olusursa hatayi donderir.
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
     * @memberof userService
     * @param {string} username - Getirilecek kullanıcının kullanıcı adı.
     * @param {string} requestedUserId - Istegi yapan kullanıcının ID'si.
     * requestedUserId kullanicinin kendi profili mi oldugunu
     * veya takip ediyor mu gibi verileri kontrol ederken kullanilir.
     * @returns {Promise<User>} Kullanici adi verilen kullanicinin profil bilgilerini donderir.
     * @throws {Error} Kullanici getirilirken bir hata olusursa hatayi donderir.
     */
    getUserProfileDetails: async (username, requestedUserId) => {
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

            return updatedUser;
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
     * 3 adet rastgele kullanıcı getirir
     * @returns  {Promise<User[]>} Kullanıcı modellerini içeren bir dizi döndürür.
     */
    getRandomUsers: async (requestedUserId) => {
        try {
            const userLimit = 3;
            const users = await userRepository.getRandomUsers(
                userLimit,
                requestedUserId
            );
            return users || [];
        } catch (error) {
            logger.error("Error getting random users:", error);
            return undefined;
        }
    },
});

export default userService;
