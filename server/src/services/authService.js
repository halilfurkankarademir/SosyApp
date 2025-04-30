import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import userService from "./userService.js";
import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../utils/constants.js";
import { getAnonymizedIp } from "../utils/helpers.js"; // Bu import kalmalı

/**
 * Kimlik doğrulama (authentication) işlemleri için servis katmanı.
 * Şifre hashleme/karşılaştırma, token doğrulama gibi işlemleri yapar
 * ve kullanıcı varlığı kontrolü/oluşturma için `userService`'i kullanır.
 * @namespace AuthService
 */
const AuthService = {
    /**
     * Yeni bir kullanıcıyı kaydeder.
     * Kullanıcı adı ve e-postanın benzersizliğini kontrol eder, şifreyi hashler
     * ve `userService` aracılığıyla kullanıcıyı oluşturur.
     * @memberof AuthService
     * @param {string} email - Kullanıcının e-posta adresi.
     * @param {string} password - Kullanıcının düz metin şifresi.
     * @param {string} username - Kullanıcının benzersiz kullanıcı adı.
     * @param {string} [firstName] - Kullanıcının adı.
     * @param {string} [lastName] - Kullanıcının soyadı.
     * @param {string} ipAddress - Kullanıcının IP adresi (anonimleştirme için).
     * @returns {Promise<User>} Oluşturulan kullanıcı nesnesini döndürür.
     * @throws {Error} Kullanıcı oluşturulurken bir hata olursa hata fırlatır.
     */
    async register(email, password, username, firstName, lastName, ipAddress) {
        try {
            logger.info("Register service started", { email, username });

            const passwordStr = String(password);

            // Kullanıcı adı ve e-posta benzersizliğini kontrol eder
            await userService.getUserByUsername(username).catch((e) => {
                if (e.message !== ErrorMessages.USER_NOT_FOUND_WITH_USERNAME)
                    throw e;
            });
            await userService.getUserByEmail(email).catch((e) => {
                if (e.message !== ErrorMessages.USER_NOT_FOUND_WITH_EMAIL)
                    throw e;
            });

            // Sifreyi hasleyerek bir degisken olusturur
            const hashedPassword = await bcrypt.hash(passwordStr, 10);

            // Kullanicinin IP adresini anonimlestirir
            const anonymizedIpAddress = getAnonymizedIp(ipAddress); // Düzeltildi: ananoymizedIpAddress -> anonymizedIpAddress

            // userService aracılığıyla kullanıcıyı olusturur
            const newUser = await userService.createUser({
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                ipAddress: anonymizedIpAddress, // Alan adının createUser beklentisiyle eşleştiğinden emin olun
            });

            logger.info("User registered successfully via AuthService", {
                userId: newUser.uid,
                email: newUser.email,
            });

            return newUser;
        } catch (error) {
            logger.error("Error during user registration in AuthService:", {
                message: error.message,
                email,
                username,
            });
            throw new Error(error.message || ErrorMessages.REGISTRATION_FAILED);
        }
    },

    /**
     * Kullanıcının giriş bilgilerini doğrular.
     * E-posta ile kullanıcıyı bulur ve sağlanan şifreyi veritabanındaki hash ile karşılaştırır.
     * @memberof AuthService
     * @param {string} email - Kullanıcının e-posta adresi.
     * @param {string} password - Kullanıcının düz metin şifresi.
     * @returns {Promise<User>} Doğrulama başarılı olursa kullanıcı nesnesini döndürür.
     * @throws {Error} Kullanıcı bulunamazsa veya şifre yanlışsa hata fırlatır.
     */
    async login(email, password) {
        try {
            logger.info("Login service started", { email });

            const passwordStr = String(password);

            // Kullanıcıyı e-posta ile bulur
            const user = await userService.getUserByEmail(email);

            // Şifre doğrulama kontrolü yapılır
            const isPasswordValid = await bcrypt.compare(
                passwordStr,
                user.password
            );

            if (!isPasswordValid) {
                logger.warn("Invalid password attempt for user.", {
                    email,
                    userId: user.uid,
                });
                throw new Error(ErrorMessages.INVALID_CREDENTIALS);
            }

            logger.info("User authenticated successfully", {
                userId: user.uid,
                email: user.email,
            });

            return user;
        } catch (error) {
            logger.error("Error during user login in AuthService:", {
                message: error.message,
                email,
            });
            throw new Error(error.message || ErrorMessages.LOGIN_FAILED);
        }
    },

    /**
     * Sağlanan refresh token'ı doğrular ve ilişkili kullanıcıyı döndürür.
     * Token'ın geçerliliğini ve süresini kontrol eder.
     * @memberof AuthService
     * @param {string} token - Doğrulanacak refresh token.
     * @returns {Promise<User>} Token geçerliyse ve kullanıcı bulunursa kullanıcı nesnesini döndürür.
     * @throws {Error} Token geçersizse, süresi dolmuşsa veya kullanıcı bulunamazsa hata fırlatır.
     */
    async refreshToken(token) {
        try {
            logger.debug("Verifying refresh token");

            // Token'ı doğrular ve decode eder
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            if (!decoded || !decoded.userId) {
                logger.warn(
                    "Invalid token payload structure after verification.",
                    { token }
                );
            }

            // Kullanıcıyı doğrulanmış ID ile bulur
            const user = await userRepository.findUser({
                where: { uid: decoded.userId },
            });

            if (!user) {
                logger.warn("User not found for a valid refresh token.", {
                    userId: decoded.userId,
                });
                throw new Error(ErrorMessages.USER_NOT_FOUND);
            }

            logger.info("Refresh token verified successfully", {
                userId: user.uid,
            });

            return user;
        } catch (error) {
            logger.error("Error verifying refresh token:", {
                message: error.message,
            });
            throw new Error(error.message || ErrorMessages.ERROR_OCCURRED);
        }
    },
};

export default AuthService;
