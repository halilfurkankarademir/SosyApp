import authService from "../services/authService.js";
import dotenv from "dotenv";
import userDTO from "../dtos/userDTO.js";
import { getAnonymizedIp } from "../utils/helpers.js";
import jwtUtils from "../utils/jwtUtils.js";
import { clearAuthCookies, setAuthCookies } from "../utils/authHelper.js";

dotenv.config();

const authController = {
    register: async (req, res) => {
        try {
            // Bodyden gelen verileri ayristir.
            const { email, password, username, firstName, lastName } = req.body;

            // Istemicinin ip adresini alip anonymize et
            const ipAdress = req.headers["x-forwarded-for"] || req.ip;
            const anonymizedIp = getAnonymizedIp(ipAdress);

            // TODO validasyon kutuphaneleri ile daha iyi validasyon yap
            // Eksik veri varsa hata dondur
            if (!email || !password || !username) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }

            // Bodyden gelen verilerle kullanıcı oluşturuluyor
            const user = await authService.register(
                email,
                password,
                username,
                firstName,
                lastName,
                anonymizedIp
            );

            // Jwt utils ile tokenler olusturuluyor
            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            // Response icin http only cookileri ayarlayan fonksiyon
            setAuthCookies(res, accessToken, refreshToken);

            // Veri guvenligi icin dto kullanarak veriyi disari aktar.
            // Bu yontemle sadece istenilen bilgiler response olarak doner.
            const userDTOInstance = new userDTO(user);

            // Eger kullanıcı oluşturuldu ise 201 status code ile response gonderilir
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
            // Bodyden gelen verileri ayristir
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: "Email and password are required" });
            }

            // Authenticate user
            const user = await authService.login(email, password);

            if (!user) {
                return res.status(401).json({ error: "Kullanıcı bulunamadı." });
            }

            // Token olustur
            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            setAuthCookies(res, accessToken, refreshToken);

            const userDTOInstance = new userDTO(user);

            res.status(200).json({
                message: "Login successful",
                user: userDTOInstance,
            });
        } catch (error) {
            console.error("Error logging in user:", error);

            if (
                error.name === "AuthenticationError" ||
                error.message.includes("Invalid credentials")
            ) {
                // Kendi hata türünüze göre uyarlayın
                return res
                    .status(401)
                    .json({ error: "Invalid email or password." });
            }

            // Diğer beklenmedik hatalar için genel 500 hatası
            res.status(500).json({
                error: "Login failed due to an internal server error.",
                // Production'da error.message'ı göndermeyin
                details:
                    process.env.NODE_ENV !== "production"
                        ? error.message
                        : undefined,
            });
        }
    },

    logout: async (req, res) => {
        try {
            clearAuthCookies(res);
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error("Error logging out user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.refresh_token;

            const user = await authService.refreshToken(token);

            const { accessToken, refreshToken } = jwtUtils.generateTokens(
                user.uid
            );

            setAuthCookies(res, accessToken, refreshToken);

            console.log("Token refreshed successfully");

            res.status(200).json({ message: "Token refreshed successfully" });
        } catch (error) {
            console.error("Error refreshing token:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default authController;
