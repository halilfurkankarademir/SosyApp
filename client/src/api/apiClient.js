import axios from "axios";

// Bu fonksiyon kullanicinin giris yapip yapmadigini kontrol eder
// Eger giris yapmamis ise refresh token islemi atilmaz ve boylece backenddeki hata cozulmus olur
const isUserAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
};

const devMode = import.meta.env.VITE_NODE_ENV;
const apiUrl = import.meta.env.VITE_BACKEND_API_LINK;

const apiClient = axios.create({
    baseURL:
        devMode === "production" ? `${apiUrl}` : "http://localhost:3000/api",
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (originalRequest.url === "/auth/refresh") {
                return Promise.reject(error);
            }

            // Kullanıcı authenticate olmuşsa refresh token isteği gönder
            if (isUserAuthenticated()) {
                try {
                    const response = await apiClient.post("/auth/refresh");
                    const csrfToken = response.data;
                    document.cookie = `csrfToken=${csrfToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
                    return apiClient(originalRequest);
                } catch (error) {
                    return Promise.reject(error);
                }
            } else {
                // Kullanıcı authenticate olmamışsa direkt hata döndür
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
