import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET =
    process.env.JWT_ACCESS_SECRET || "fallback_access_secret";
const REFRESH_TOKEN_SECRET =
    process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

const jwtUtils = {
    generateTokens: (userId) => {
        if (!userId) {
            throw new Error("User ID is required to generate tokens");
        }
        const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        return { accessToken, refreshToken };
    },

    verifyAccessToken: (token) => {
        if (!token) {
            throw new Error("Access token is required for verification");
        }
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    },

    verifyRefreshToken: (token) => {
        if (!token) {
            throw new Error("Refresh token is required for verification");
        }
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    },
};

export default jwtUtils;
