import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userRepository from "../repositories/userRepository.js";
import { verifyUserFromTokenCookie } from "../utils/authHelper.js";
dotenv.config();

// Token doğrulama middleware
export const authenticateToken = async (req, res, next) => {
    try {
        const user = await verifyUserFromTokenCookie(req.headers.cookie);

        if (!user) {
            return res
                .status(403)
                .json({ error: "Geçersiz veya Süresi Dolmuş Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res
            .status(403)
            .json({ error: "Geçersiz veya süresi dolmuş token" });
    }
};
