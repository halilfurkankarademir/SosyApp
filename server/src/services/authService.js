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

            console.log("Register - Email:", email);
            console.log("Register - Username:", username);
            console.log("Register - Hashed Password:", hashedPassword);
            console.log(
                "Register - Hashed Password length:",
                hashedPassword.length
            );

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
            throw new Error("Could not register user: " + error.message);
        }
    },

    async login(email, password) {
        try {
            // Şifrenin string donusumu
            const passwordStr = String(password);

            const user = await UserService.getUserByEmail(email);

            if (!user) {
                console.log("User not found with email:", email);
                throw new Error("User not found");
            }

            console.log("User found. ID:", user.id);
            console.log("Stored password:", user.password);
            console.log("Stored password length:", user.password.length);
            console.log("Input password:", passwordStr);
            console.log("Input password length:", passwordStr.length);

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
                    console.error("Password mismatch - DEBUG INFO:");
                    console.log("Input password:", passwordStr);
                    console.log("Stored hash:", user.password);

                    // TEST: Aynı şifreyi tekrar hash'le ve karşılaştır
                    const testHash = await bcrypt.hash(passwordStr, 10);
                    const testCompare = await bcrypt.compare(
                        passwordStr,
                        testHash
                    );
                    console.log("Test hash comparison:", testCompare); // true olmalı

                    throw new Error("Invalid credentials"); // Klasik hata mesajı
                }
            } catch (bcryptError) {
                console.error("Bcrypt compare error:", bcryptError);
                throw new Error(
                    "Password validation failed: " + bcryptError.message
                );
            }

            if (!isPasswordValid) {
                console.log("Invalid password for user:", user.email);
                throw new Error("Invalid password");
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
