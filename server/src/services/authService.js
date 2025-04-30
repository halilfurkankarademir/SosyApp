import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import userService from "./userService.js";
import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../utils/constants.js";

const AuthService = {
    async register(email, password, username, firstName, lastName, ipAdress) {
        try {
            logger.info("Register started");
            // Şifreyi string'e çevirelim (güvenlik için)
            const passwordStr = String(password);

            const hashedPassword = await bcrypt.hash(passwordStr, 10);

            let existingUsername;
            try {
                existingUsername = await userService.getUserByUsername(
                    username
                );
            } catch (error) {
                // Hata alirsa kullanici adi yok demektir
                existingUsername = null;
            }
            if (existingUsername) {
                logger.error("Username already exists.");
                throw new Error("Kullanıcı adı zaten kullanılıyor.");
            }

            let existingEmail;
            try {
                existingEmail = await userService.getUserByEmail(email);
            } catch (error) {
                // Email yoksa hata verecegi icin hata durumuna null atayalim
                existingEmail = null;
            }

            if (existingEmail) {
                logger.error("Email already exists.");
                throw new Error("Email zaten kullanılıyor.");
            }

            const newUser = await userService.createUser({
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                ipAdress,
            });

            logger.info("User created successfully", {
                userId: newUser.uid,
                email: newUser.email,
                operation: "createUser",
            });

            return newUser;
        } catch (error) {
            logger.error("Error creating user:", error);
            throw new Error(error.message);
        }
    },

    async login(email, password, ipAdress) {
        try {
            logger.info("Login started");
            // Şifrenin string donusumu
            const passwordStr = String(password);

            const user = await userService.getUserByEmail(email);

            if (!user) {
                logger.error("User not found.");
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            // Şifre doğrulama kontrolü
            let isPasswordValid = false;

            try {
                isPasswordValid = await bcrypt.compare(
                    passwordStr,
                    user.password
                );

                if (!isPasswordValid) {
                    logger.error("Invalid credentials.");
                    throw new Error(ErrorMessages.INVALID_CREDENTIALS);
                }
            } catch (bcryptError) {
                logger.error("Error comparing passwords:", bcryptError);
                throw new Error(ErrorMessages.INVALID_CREDENTIALS);
            }

            if (!isPasswordValid) {
                logger.error("Invalid credentials.");
                throw new Error(ErrorMessages.INVALID_CREDENTIALS);
            }

            logger.info("User logged in successfully", {
                userId: user.id,
                email: user.email,
                operation: "login",
            });

            return user;
        } catch (error) {
            logger.error("Error logging in:", error);
            throw new Error(error.message);
        }
    },

    async refreshToken(token) {
        if (!token) {
            logger.error("No token provided.");
            clearAuthCookies(res);
            return res
                .status(401)
                .json({ error: "Gecersiz veya Süresi Dolmuş Token" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            const user = await userRepository.findUser({
                where: { uid: decoded.userId },
            });

            if (!user) {
                logger.error("User not found.");
                throw new Error(ErrorMessages.TOKEN_EXPIRED);
            }
            return user;
        } catch (error) {
            logger.error("Error verifying token:", error);
            throw new Error(error.message);
        }
    },
};

export default AuthService;
