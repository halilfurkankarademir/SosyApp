import axios from "axios";

const devMode = import.meta.env.VITE_NODE_ENV;
const apiUrl = import.meta.env.VITE_BACKEND_API_LINK;

const apiClient = axios.create({
    baseURL:
        devMode === "production"
            ? `${apiUrl}/auth`
            : "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const register = (email, password, username, firstName, lastName) => {
    try {
        return apiClient
            .post("/register", {
                email,
                password,
                username,
                firstName,
                lastName,
            })
            .then((response) => {
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem(
                    "email",
                    JSON.stringify(response.data.user.email)
                );
                return response.data;
            })
            .catch((error) => {
                console.error("Registration error:", error);
                throw error;
            });
    } catch (error) {
        console.log("Error registering user:", error);
    }
};

export const login = (email, password) => {
    try {
        return apiClient
            .post("/login", { email, password })
            .then((response) => {
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem(
                    "email",
                    JSON.stringify(response.data.user.email)
                );
                return response.data;
            })
            .catch((error) => {
                console.error("Login error:", error);
                localStorage.setItem("isAuthenticated", false);
                throw error;
            });
    } catch (error) {
        console.log("Error logging in user:", error);
    }
};

export const logout = () => {
    try {
        return apiClient.post("/logout");
    } catch (error) {
        console.log("Error logging out user:", error);
    }
};

export const forgotPassword = (email) => {
    // You can implement this using apiClient when needed
    // return apiClient.post("/forgot-password", { email });
};
