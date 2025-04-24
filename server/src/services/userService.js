import User from "../models/userModel.js";
import userRepository from "../repositories/userRepository.js";
import logger from "../utils/logger.js";

const UserService = {
    createUser: async (userData) => {
        try {
            logger.debug("Creating user started", { userData });

            const newUser = await User.create({
                ...userData,
            });

            logger.info("User created successfully", {
                userId: newUser.id,
                email: newUser.email,
                operation: "createUser",
            });

            return newUser;
        } catch (error) {
            logger.error("User creation failed", {
                error: error.message,
                operation: "createUser",
            });
            throw new Error("Could not create user: " + error.message);
        }
    },

    updateUser: async (userId, updates) => {
        try {
            logger.debug(`Updating user`, { userId });
            const user = await userRepository.getByUserId(userId);
            if (!user) {
                logger.warn("User not found for update", { userId });
                throw new Error("User not found");
            }

            await user.update(updates);

            logger.info(`User updated successfully ${userId}`);
        } catch (error) {
            logger.error(`User update failed ${userId}`, {
                error: error.message,
            });
            throw new Error("Could not update user");
        }
    },

    deleteUser: async (userId, ipAdress) => {
        try {
            logger.debug(`Ip ${ipAdress} Deleting user`, { userId });
            const user = await userRepository.getByUserId(userId);
            if (!user) {
                logger.warn("User not found for deletion", { userId });
                throw new Error("User not found");
            }

            await user.destroy();

            logger.info(`Ip ${ipAdress} User deleted successfully`, {
                userId,
                email: user.email,
                operation: "deleteUser",
            });

            return { success: true };
        } catch (error) {
            logger.error(`Ip ${ipAdress} User deletion failed`, {
                error: error.message,
                userId,
                operation: "deleteUser",
            });
            throw new Error("Could not delete user");
        }
    },

    getAllUsers: async (ipAdress) => {
        try {
            logger.debug("Fetching all users started");

            const users = await userRepository.getAll();

            logger.info(`Ip ${ipAdress} Successfully retrieved all users`, {
                count: users.length,
                operation: "getAllUsers",
            });

            return users;
        } catch (error) {
            logger.error(`Ip ${ipAdress} failed to fetch all users`, {
                error: error.message,
                operation: "getAllUsers",
            });
            throw new Error("Could not retrieve users");
        }
    },

    getUserById: async (userId) => {
        try {
            logger.debug(`Fetching user by ID`, { userId });
            const user = await userRepository.getByUserId(userId);

            if (!user) {
                logger.warn("User not found", { userId });
                throw new Error("User not found");
            }

            logger.info(`Successfully retrieved user by ID`, {
                userId,
                operation: "getUserById",
            });

            return user;
        } catch (error) {
            logger.error(` failed to fetch user by ID`, {
                error: error.message,
                userId,
                operation: "getUserById",
            });
            throw new Error("Could not retrieve user");
        }
    },
    getUserByEmail: async (email) => {
        try {
            console.log("Finding user by email:", email);

            // Doğrudan User modeli üzerinden sorgu yapalım
            const user = await userRepository.getByEmail(email);

            console.log(user);

            if (!user) {
                console.warn("User not found by email:", email);
                throw new Error("Kayıtlı kullanıcı bulunamadı.");
            }

            return user;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            logger.error("Error fetching user by email", {
                error: error.message,
                operation: "getUserByEmail",
                email,
            });
            throw new Error("Kayıtlı kullanıcı bulunamadı.");
        }
    },

    getUserByUsername: async (username) => {
        try {
            const user = await userRepository.getByUsername(username);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error fetching user by username:", error);
            logger.error("Error fetching user by username", {
                error: error.message,
                operation: "getUserByUsername",
                username,
            });
            throw new Error(
                "Could not retrieve user by username: " + error.message
            );
        }
    },
};

export default UserService;
