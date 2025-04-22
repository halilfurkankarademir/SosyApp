import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import UserService from "./userService.js";

const AuthService = {
    async register(email, password, username, firstName, lastName) {
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
            });

            return newUser;
        } catch (error) {
            console.error("Register error:", error);
            throw new Error(error.message);
        }
    },

    async login(email, password) {
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
};

export default AuthService;
