import User from "../models/userModel.js";
import logger from "../utils/logger.js";

const UserService = {
    createUser: async (userData) => {
        try {
            logger.info("Creating user started", {
                email: userData.email,
                operation: "createUser",
            });

            const newUser = await User.create(userData);

            logger.info("User created successfully", {
                userId: newUser.id,
                email: newUser.email,
                operation: "createUser",
            });

            return newUser;
        } catch (error) {
            logger.error("User creation failed", {
                error: error.message,
                stack: error.stack,
                userData: { email: userData.email },
                operation: "createUser",
            });
            throw new Error("Could not create user");
        }
    },

    deleteUser: async (userId) => {
        try {
            logger.debug("Deleting user initiated", { userId });

            const user = await User.findByPk(userId);
            if (!user) {
                logger.warn("User not found for deletion", { userId });
                throw new Error("User not found");
            }

            await user.destroy();

            logger.info("User deleted successfully", {
                userId,
                email: user.email,
                operation: "deleteUser",
            });

            return { success: true };
        } catch (error) {
            logger.error("User deletion failed", {
                error: error.message,
                userId,
                operation: "deleteUser",
            });
            throw new Error("Could not delete user");
        }
    },

    getAllUsers: async () => {
        try {
            logger.debug("Fetching all users started");

            const users = await User.findAll();

            logger.info("Successfully retrieved all users", {
                count: users.length,
                operation: "getAllUsers",
            });

            return users;
        } catch (error) {
            logger.error("Failed to fetch all users", {
                error: error.message,
                operation: "getAllUsers",
            });
            throw new Error("Could not retrieve users");
        }
    },

    getUserById: async (userId) => {
        try {
            logger.debug("Fetching user by ID ", { userId });

            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                logger.warn("User not found", { userId });
                throw new Error("User not found");
            }

            logger.info("Successfully retrieved user", {
                userId,
                operation: "getUserById",
            });

            return user;
        } catch (error) {
            logger.error("Failed to fetch user by ID", {
                error: error.message,
                userId,
                operation: "getUserById",
            });
            throw new Error("Could not retrieve user");
        }
    },
};

export default UserService;
