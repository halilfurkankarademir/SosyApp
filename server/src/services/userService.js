import User from "../models/userModel.js";
import userRepository from "../repositories/userRepository.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";

const UserService = {
    createUser: async (userData) => {
        try {
            logger.debug("Creating user started", { userData });

            // Şifre hashleme işlemi AuthService'de yapıldığı için tekrar yapılmaması gerekiyor
            // Eğer userData içinde password hash edilmemiş olarak gelirse, hata oluşabilir
            console.log(
                "Creating user with password:",
                userData.password?.substring(0, 10) + "..."
            );
            console.log(
                "Password appears to be hashed:",
                userData.password?.length > 30
            );

            // Password zaten hash edilmiş olmalı - tekrar hashleme yapmıyoruz
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

    deleteUser: async (userId, ipAdress) => {
        try {
            logger.debug(`Ip ${ipAdress} Deleting user`, { userId });

            const user = await userRepository.getById(userId);
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

    getUserById: async (userId, ipAdress) => {
        try {
            logger.debug(`Ip ${ipAdress} Fetching user by ID`, { userId });

            const user = await userRepository.getById(userId);

            if (!user) {
                logger.warn("User not found", { userId });
                throw new Error("User not found");
            }

            logger.info(`Ip ${ipAdress} Successfully retrieved user by ID`, {
                userId,
                operation: "getUserById",
            });

            return user;
        } catch (error) {
            logger.error(`Ip ${ipAdress} failed to fetch user by ID`, {
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
            const user = await User.findOne({ where: { email } });

            if (user) {
                console.log("User found by email:", email);
                console.log("User ID:", user.id);
            } else {
                console.log("No user found with email:", email);
            }

            return user;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            logger.error("Error fetching user by email", {
                error: error.message,
                operation: "getUserByEmail",
                email,
            });
            throw new Error(
                "Could not retrieve user by email: " + error.message
            );
        }
    },
};

export default UserService;
