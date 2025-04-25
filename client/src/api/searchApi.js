import apiClient from "./apiClient";

export const searchUsers = async (query) => {
    try {
        const response = await apiClient.get("/search/users", {
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
        const response = await apiClient.get("/search/posts", {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching posts:", error);
    }
};
