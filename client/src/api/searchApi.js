import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api/search",
    withCredentials: true,
});

export const searchUsers = async (query) => {
    try {
        const response = await apiClient.get("/users", {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching users:", error);
    }
};

export const searchPosts = async (query) => {
    try {
        const response = await apiClient.get("/posts", {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching posts:", error);
    }
};
