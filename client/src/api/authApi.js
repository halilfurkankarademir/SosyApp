import axios from "axios";

export const register = (email, password, username, firstName, lastName) => {
    try {
        // api/auth/register endpointine email, password, username, firstName ve lastName ile post isteği gonderen bir fonksiyon
        // Bu istek, kullanıcının kayıt olmasını sağlar ve sunucudan gelen yanıtı döner
        return axios
            .post(
                "http://localhost:3000/api/auth/register",
                {
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                },
                {
                    // Http only cookileri kullanabilmek icin gerekli ayar
                    withCredentials: true,
                }
            )
            .then((response) => {
                // Kayit basarili ise, yerel depolamaya isAuthenticated anahtari ile true degeri eklenir
                // Bu, kullanıcının giriş yapmış olduğunu belirtir ve authContext'te kullanılabilir
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
        // api/auth/login endpointine email ve password ile post isteği gonderen bir fonksiyon
        // Bu istek, kullanıcının giriş yapmasını sağlar ve sunucudan gelen yanıtı döner
        return axios
            .post(
                "http://localhost:3000/api/auth/login",
                { email, password },
                {
                    // Http only cookileri kullanabilmek icin gerekli ayar
                    withCredentials: true,
                }
            )
            .then((response) => {
                // Giris basarili ise, yerel depolamaya isAuthenticated anahtari ile true degeri eklenir
                // Bu, kullanıcının giriş yapmış olduğunu belirtir ve authContext'te kullanılabilir
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
        return axios.post(
            "http://localhost:3000/api/auth/logout",
            {},
            { withCredentials: true }
        );
    } catch (error) {
        console.log("Error logging out user:", error);
    }
};

export const forgotPassword = (email) => {};
