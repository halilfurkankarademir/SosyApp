import transporter from "../config/mail.js";
import { generateOTP } from "../utils/authHelper.js";
import { verifyMailTemplate } from "../utils/constants.js";
import logger from "../utils/logger.js";
import NodeCache from "node-cache";
import bcyrpt from "bcrypt";
import diContainer from "../config/dependencyInjection.js";
import createHttpError from "http-errors";

const { userService } = diContainer;

// otp saklamak icin 2 dakika hafizali bir cache olusturur
const myCache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const mailService = {
    /**
     * Kullanicinin emailine dogrulama kodu gonderir
     * @param {string} email  - Dogrulama kodu gonderecegimiz kullanıcının email'i
     * @param {string} userId - Dogrulama kodu gonderecegimiz kullanıcının id'si
     * @returns {void} Basarılı olursa `void`, hata durumunda ilgili status kodları (401, 500).
     */
    sendVerificationMail: async (email, userId) => {
        try {
            if (!email || !userId) {
                throw createHttpError(400, "Email and userId are required.");
            }

            const cachedOtp = myCache.get(userId);

            // Zaten otp kodu varsa gonderme yapma
            if (cachedOtp) {
                return;
            }

            const otpCode = generateOTP();

            const mailTemplate = verifyMailTemplate(otpCode);

            await transporter.sendMail({
                from: `"Sosyapp" <${process.env.MAIL_USER}>`,
                to: email,
                subject: "Hesabını Doğrula - Sosyapp",
                html: mailTemplate,
            });

            const hashedOTP = bcyrpt.hashSync(otpCode.toString(), 10);

            myCache.set(userId, hashedOTP);
        } catch (error) {
            throw createHttpError(500, "Failed to send verification email.");
        }
    },

    verifyUserWithOTP: async (userId, otpCode) => {
        try {
            const cachedOtpHash = myCache.get(userId);

            if (!cachedOtpHash) {
                throw createHttpError(400, "Invalid OTP.");
            }

            const isMatch = await bcyrpt.compare(otpCode, cachedOtpHash);

            if (!isMatch) {
                throw createHttpError(400, "Invalid OTP.");
            }

            await userService.updateUserById(userId, {
                verified: true,
            });

            myCache.del(userId);

            return { success: true, message: "OTP verified successfully." };
        } catch (error) {
            throw createHttpError(500, "Failed to verify user.");
        }
    },
};

export default mailService;
