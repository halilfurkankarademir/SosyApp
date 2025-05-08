import { deleteCookie } from "../utils/helpers";
import apiClient from "./apiClient";

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
                const csrfToken = response.data.csrfToken;
                document.cookie = `csrfToken=${csrfToken} expires=Fri, 31 Dec 9999 23:59:59 GMT`;
                localStorage.setItem("isAuthenticated", true);
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        console.log("Error registering user:", error);
    }
};

export const login = (email, password) => {
    try {
        return apiClient
            .post("/auth/login", { email, password })
            .then((response) => {
                const csrfToken = response.data.csrfToken;
                document.cookie = `csrfToken=${csrfToken} expires=Fri, 31 Dec 9999 23:59:59 GMT`;
                localStorage.setItem("isAuthenticated", true);
                return response.data;
            })
            .catch((error) => {
                localStorage.setItem("isAuthenticated", false);
                throw error;
            });
    } catch (error) {
        console.log("Error logging in user:", error);
    }
};

export const logout = () => {
    try {
        deleteCookie("csrf_token");
        return apiClient.post("/auth/logout");
    } catch (error) {
        console.log("Error logging out user:", error);
    }
};

export const forgotPassword = (email) => {
    // You can implement this using apiClient when needed
    // return apiClient.post("/forgot-password", { email });
};

export const getCSRFToken = () => {
    try {
        const response = apiClient.get("/auth/csrf-token");
        return response.data;
    } catch (error) {
        console.log("Error getting CSRF token:", error);
    }
};

export const sendVerificationMail = () => {
    try {
        return apiClient
            .post("/auth/send-verification-email")
            .then((res) => res.data);
    } catch (error) {
        console.log("Error sending verification email:", error);
    }
};

export const verifyUserWithOTP = (otpCode) => {
    try {
        return apiClient
            .post("/auth/verify-user-with-otp", { otpCode })
            .then((res) => res.data);
    } catch (error) {
        console.log("Error verifying OTP:", error);
    }
};
