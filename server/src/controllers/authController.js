import authService from "../services/authService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userDTO from "../dtos/userDTO.js";
import { getAnonymizedIp } from "../utils/helpers.js";
dotenv.config();

const authController = {
    register: async (req, res) => {
        try {
            const { email, password, username, firstName, lastName } = req.body;

            const ipAdress = req.headers["x-forwarded-for"] || req.ip;
            const anonymizedIp = getAnonymizedIp(ipAdress);

            // Validate required fields
            if (!email || !password || !username) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }

            console.log("Registering user:", { email, username });

            // Create user through authService
            const user = await authService.register(
                email,
                password,
                username,
                firstName,
                lastName,
                anonymizedIp
            );

            const userDTOInstance = new userDTO(user);

            // Token oluşturma işlemi

            const token = jwt.sign(
                { userId: user.uid },
                process.env.JWT_SECRET_25,
                { expiresIn: "30d" }
            );

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            // Return success response with user data
            res.status(201).json({
                message: "User registered successfully",
                user: userDTOInstance,
            });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({
                error: "Registration failed",
                details: error.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const ipAdress = req.headers["x-forwarded-for"] || req.ip;
            const anonymizedIp = getAnonymizedIp(ipAdress);

            // Validate required fields
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: "Email and password are required" });
            }

            // Authenticate user
            const user = await authService.login(email, password);
            const userDTOInstance = new userDTO(user);

            if (!user) {
                return res.status(401).json({ error: "Kullanıcı bulunamadı." });
            }

            // Token oluşturma işlemi

            const accessToken = jwt.sign(
                {
                    userId: user.uid,
                },
                process.env.JWT_SECRET_25,
                { expiresIn: "30d" }
            );

            const refreshToken = jwt.sign(
                { userId: user.uid },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
            );

            // Set cookies
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 604800000, // 7 days
            });

            // Return success response with user data
            res.status(200).json({
                message: "Login successful",
                user: userDTOInstance,
            });
        } catch (error) {
            console.error("Error logging in user:", error);
            res.status(500).json({
                error: "Login failed",
                details: error.message,
            });
        }
    },

    logout: async (req, res) => {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "Logout successful" });
    },
};

export default authController;
