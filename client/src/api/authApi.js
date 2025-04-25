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
            .post("/auth/login", { email, password })
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
        return apiClient.post("/auth/logout");
    } catch (error) {
        console.log("Error logging out user:", error);
    }
};

export const forgotPassword = (email) => {
    // You can implement this using apiClient when needed
    // return apiClient.post("/forgot-password", { email });
};
