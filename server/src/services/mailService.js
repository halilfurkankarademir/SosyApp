import transporter from "../config/mail.js";
import { generateOTP } from "../utils/authHelper.js";
import { verifyMailTemplate } from "../utils/constants.js";
import logger from "../utils/logger.js";
import NodeCache from "node-cache";
import bcyrpt from "bcrypt";
import diContainer from "../config/dependencyInjection.js";

const { userService } = diContainer;

// 2 dakika hafizali bir cache olusturur otp saklamak icin
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
            const cachedOtp = myCache.get(userId);

            if (cachedOtp) {
                return;
            }

            logger.info("Sending verification email...");

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

            logger.info("Verification email sent successfully");
        } catch (error) {
            logger.error("Error in mailService.sendVerificationMail:", error);
        }
    },

    verifyUserWithOTP: async (userId, otpCode) => {
        try {
            const cachedOtpHash = myCache.get(userId);

            if (!cachedOtpHash) {
                logger.warn(`OTP for user ${userId} not found or expired.`);
                return { success: false, message: "OTP not found or expired." };
            }

            const isMatch = await bcyrpt.compare(otpCode, cachedOtpHash);

            if (!isMatch) {
                logger.warn(`Invalid OTP provided for user ${userId}.`);
                return { success: false, message: "Invalid OTP." };
            }

            await userService.updateUserById(userId, {
                verified: true,
            });

            logger.info(`User ${userId} verified successfully.`);

            myCache.del(userId);

            return { success: true, message: "OTP verified successfully." };
        } catch (error) {
            logger.error("Error in verifyUserWithOTP:", error);
            return {
                success: false,
                message: "An error occurred during OTP verification.",
            };
        }
    },
};

export default mailService;
