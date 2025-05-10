/**
 * Mail işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import mailService from "../services/mailService.js";
import logger from "../utils/logger.js";

const { userService } = diContainer;

/**
 * Mail işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */
const mailController = {
    /**
     * Dogrulama maili gonderme işlemleri için controller fonksiyonlarını içerir.
     */
    sendVerificationMail: async (req, res, next) => {
        try {
            logger.info("Sending verification mail...");

            const requestUserId = req.user.uid;

            const user = await userService.getUserById(requestUserId);

            const email = user.email;

            await mailService.sendVerificationMail(email, requestUserId);

            logger.info("Verification mail sent successfully");

            res.status(200).json({ message: "Verification mail sent" });
        } catch (error) {
            logger.error(
                "Error in mailController.sendVerificationMail:",
                error
            );
            next(error);
        }
    },

    /**
     * Dogrulama kodunu dogrulama işlemleri için controller fonksiyonlarını içerir.
     */
    verifyUserWithOTP: async (req, res, next) => {
        try {
            logger.info("Verifying user with OTP...");

            const userId = req.user.uid;
            const otpCode = req.body.otpCode;

            const result = await mailService.verifyUserWithOTP(userId, otpCode);

            logger.info("User verified successfully");

            res.status(200).json({ message: result.message });
        } catch (error) {
            logger.error("Error in mailController.verifyUserWithOTP:", error);
            next(error);
        }
    },
};

export default mailController;
