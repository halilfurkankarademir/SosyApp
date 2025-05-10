import { deleteCookie } from "../utils/helpers";
import apiClient from "./apiClient";

const isDevMode = import.meta.env.VITE_NODE_ENV === "development";

export const register = (email, password, username, firstName, lastName) => {
    try {
        return apiClient
            .post("/auth/register", {
                email,
                password,
                username,
                firstName,
                lastName,
            })
            .then((response) => {
                localStorage.setItem("isAuthenticated", true);
                return response.data;
            });
    } catch (error) {
        isDevMode && console.log("Error registering user:", error);
    }
};

export const login = (email, password) => {
    try {
        return apiClient
            .post("/auth/login", { email, password })
            .then((response) => {
                // Kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem("isAuthenticated", true);

                return response.data;
            });
    } catch (error) {
        localStorage.setItem("isAuthenticated", false);
        isDevMode && console.log("Error logging in user:", error);
    }
};

export const logout = () => {
    try {
        return apiClient.post("/auth/logout").then((response) => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            deleteCookie("csrfToken");
            return response;
        });
    } catch (error) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("csrfToken");
        isDevMode && console.log("Error logging out user:", error);
    }
};

export const forgotPassword = (email) => {
    // You can implement this using apiClient when needed
    // return apiClient.post("/forgot-password", { email });
};

export const getCSRFToken = () => {
    try {
        const response = apiClient.get("/auth/csrf-token");
        return response;
    } catch (error) {
        isDevMode && console.log("Error getting CSRF token:", error);
    }
};

export const sendVerificationMail = () => {
    try {
        return apiClient
            .post("/auth/send-verification-email")
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error sending verification email:", error);
    }
};

export const verifyUserWithOTP = (otpCode) => {
    try {
        return apiClient
            .post("/auth/verify-user-with-otp", { otpCode })
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error verifying user with OTP:", error);
    }
};
