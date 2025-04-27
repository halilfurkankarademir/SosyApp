import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import UserService from "./userService.js";
import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";

const AuthService = {
    async register(email, password, username, firstName, lastName, ipAdress) {
        try {
            // Şifrenin ham halini yazdıralım
            console.log("Registering with raw password:", password);
            console.log("Password type:", typeof password);

            // Şifreyi string'e çevirelim (güvenlik için)
            const passwordStr = String(password);

            const hashedPassword = await bcrypt.hash(passwordStr, 10);

            let existingUsername;
            try {
                existingUsername = await UserService.getUserByUsername(
                    username
                );
            } catch (error) {
                // Hata alirsa kullanici adi yok demektir
                existingUsername = null;
            }
            if (existingUsername) {
                console.log("Username already exists:", username);
                throw new Error("Kullanıcı adı zaten kullanılıyor.");
            }

            let existingEmail;
            try {
                existingEmail = await UserService.getUserByEmail(email);
            } catch (error) {
                // Email yoksa hata verecegi icin hata durumuna null atayalim
                existingEmail = null;
            }

            if (existingEmail) {
                console.log("Email already exists:", email);
                throw new Error("Email zaten kullanılıyor.");
            }

            const newUser = await UserService.createUser({
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                ipAdress,
            });

            return newUser;
        } catch (error) {
            console.error("Register error:", error);
            throw new Error(error.message);
        }
    },

    async login(email, password, ipAdress) {
        try {
            // Şifrenin string donusumu
            const passwordStr = String(password);

            const user = await UserService.getUserByEmail(email);

            if (!user) {
                console.log("User not found with email:", email);
                throw new Error("Kullanıcı bulunamadı.");
            }

            // Şifre doğrulama kontrolü
            let isPasswordValid = false;

            try {
                // Bcrypt ile şifreyi karşılaştır
                isPasswordValid = await bcrypt.compare(
                    passwordStr,
                    user.password
                );
                console.log("Password validation result:", isPasswordValid);

                // Hala başarısız ise, elle karşılaştırma deneyelim
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials"); // Klasik hata mesajı
                }
            } catch (bcryptError) {
                console.error("Bcrypt compare error:", bcryptError);
                throw new Error("Hatalı kullanıcı adı veya şifre girdiniz.");
            }

            if (!isPasswordValid) {
                console.log("Invalid password for user:", user.email);
                throw new Error("Hatalı kullanıcı adı veya şifre girdiniz.");
            }

            logger.info("User logged in successfully", {
                userId: user.id,
                email: user.email,
                operation: "login",
            });

            return user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    async refreshToken(token) {
        if (!token) {
            console.log("Refresh token not found in cookies");
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
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.log("Error verifying refresh token:", error);
        }
    },
};

export default AuthService;
