import axios from "axios";

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

            try {
                const response = await apiClient.post("/auth/refresh");
                const csrfToken = response.data;
                document.cookie = `csrfToken=${csrfToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
                return apiClient(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
