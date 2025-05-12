import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../utils/constants.js";
import jwtUtils from "../utils/jwtUtils.js";
import userDTO from "../dtos/userDTO.js";
import createHttpError from "http-errors";
import logger from "../utils/logger.js";

/**
 * Kimlik doğrulama (authentication) işlemleri için servis katmanı.
 * Şifre hashleme/karşılaştırma, token doğrulama gibi işlemleri yapar
 * ve kullanıcı varlığı kontrolü/oluşturma için `userService`'i kullanır.
 */
const authService = (userRepository, userService) => ({
    /**
     * Yeni bir kullanıcıyı kaydeder.
     * Kullanıcı adı ve e-postanın benzersizliğini kontrol eder, şifreyi hashler
     * ve `userService` aracılığıyla kullanıcıyı oluşturur.
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

            // userService aracılığıyla kullanıcıyı olusturur
            const createdUser = await userService.createUser({
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                ipAddress,
            });

            if (!createdUser) {
                throw createHttpError(500, ErrorMessages.REGISTRATION_FAILED);
            }

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                createdUser.uid
            );

            const user = new userDTO(createdUser);

            return { user, accessToken, refreshToken };
        } catch (error) {
            throw createHttpError(500, ErrorMessages.REGISTRATION_FAILED);
        }
    },

    /**
     * Kullanıcının giriş bilgilerini doğrular.
     * E-posta ile kullanıcıyı bulur ve sağlanan şifreyi veritabanındaki hash ile karşılaştırır.
     * @param {string} email - Kullanıcının e-posta adresi.
     * @param {string} password - Kullanıcının düz metin şifresi.
     * @returns {Promise<User>} Doğrulama başarılı olursa kullanıcı nesnesini döndürür.
     * @throws {Error} Kullanıcı bulunamazsa veya şifre yanlışsa hata fırlatır.
     */
    async login(email, password) {
        try {
            const passwordStr = String(password);

            // Kullanıcıyı e-posta ile bulur
            const user = await userService.getUserByEmail(email);

            // Şifre doğrulama kontrolü yapılır
            const isPasswordValid = await bcrypt.compare(
                passwordStr,
                user.password
            );

            if (!isPasswordValid || !user) {
                throw createHttpError(401, ErrorMessages.INVALID_CREDENTIALS);
            }

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            await userRepository.update(user.uid, { lastLoginAt: new Date() });

            const userDTOInstance = new userDTO(user);

            return {
                user: userDTOInstance,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw createHttpError(500, ErrorMessages.LOGIN_FAILED);
        }
    },

    /**
     * Sağlanan refresh token'ı doğrular ve ilişkili kullanıcıyı döndürür.
     * Token'ın geçerliliğini ve süresini kontrol eder.
     * @param {string} token - Doğrulanacak refresh token.
     * @returns {Promise<User>} Token geçerliyse ve kullanıcı bulunursa kullanıcı nesnesini döndürür.
     * @throws {Error} Token geçersizse, süresi dolmuşsa veya kullanıcı bulunamazsa hata fırlatır.
     */
    async refreshToken(token) {
        try {
            if (!token) {
                throw createHttpError(401, ErrorMessages.TOKEN_NOT_FOUND);
            }

            // Token'ı doğrular ve decode eder
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            if (!decoded || !decoded.userId) {
                throw createHttpError(401, ErrorMessages.TOKEN_NOT_FOUND);
            }

            // Kullanıcıyı doğrulanmış ID ile bulur
            const user = await userRepository.findUser({
                where: { uid: decoded.userId },
            });

            if (!user) {
                throw createHttpError(401, ErrorMessages.USERS_NOT_FOUND);
            }

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            await userRepository.update(user.uid, { lastLoginAt: new Date() });

            return { user, accessToken, refreshToken };
        } catch (error) {
            throw createHttpError(500, ErrorMessages.REFRESH_TOKEN_FAILED);
        }
    },
});

export default authService;
