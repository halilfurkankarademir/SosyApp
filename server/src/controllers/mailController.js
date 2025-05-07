import diContainer from "../config/dependencyInjection.js";
import mailService from "../services/mailService.js";
import logger from "../utils/logger.js";

const { userService } = diContainer;

const mailController = {
    sendVerificationMail: async (req, res, next) => {
        try {
            logger.info("Sending verification mail...");
            const requestUserId = req.user.uid;
            const user = await userService.getUserById(requestUserId);
            if (!user) {
                return res.status(404).json({ error: "Kullanıcı bulunamadı" });
            }
            const email = user.email;

            if (!email) {
                return res.status(404).json({ error: "Email bulunamadı" });
            }

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

    verifyUserWithOTP: async (req, res, next) => {
        try {
            logger.info("Verifying user with OTP...");
            const userId = req.user.uid;
            const otpCode = req.body.otpCode;
            const result = await mailService.verifyUserWithOTP(userId, otpCode);
            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }
            logger.info("User verified successfully");
            res.status(200).json({ message: result.message });
        } catch (error) {
            logger.error("Error in mailController.verifyUserWithOTP:", error);
            next(error);
        }
    },
};

export default mailController;
