//todo buraya kullanicinin giris cikis islmeleri ve kayit islemleri tarzi islemler eklenecek
import axios from "axios";
export const login = (email, password) => {
    try {
        return axios
            .post(
                "http://localhost:3000/api/auth/login",
                { email, password },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error("Login error:", error);
                throw error;
            });
    } catch (error) {
        console.log("Error logging in user:", error);
    }
};

export const register = (email, password, username, firstName, lastName) => {
    try {
        return axios.post(
            "http://localhost:3000/api/auth/register",
            {
                email,
                password,
                username,
                firstName,
                lastName,
            },
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.log("Error registering user:", error);
    }
};

export const logout = () => {};

export const forgotPassword = (email) => {};

export const loginWithGoogle = () => {};

export const getCurrentUser = () => {};
