import apiClient from "./apiClient";

export const savePost = async (postId) => {
    try {
        return await apiClient.post(`/saved/${postId}`);
    } catch (error) {
        console.error("Error saving post:", error);
        throw error; // Re-throw to allow error handling in components
    }
};

export const unsavePost = async (postId) => {
    try {
        return await apiClient.delete(`/saved/${postId}`);
    } catch (error) {
        console.error("Error un-saving post:", error);
        throw error;
    }
};

export const getSavedPosts = async (page, filter) => {
    try {
        const response = await apiClient.get("/saved/", {
            params: { page, filter },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting saved posts:", error);
        throw error;
    }
};

export const isPostSaved = async (postId) => {
    try {
        const response = await apiClient.get(`/saved/check/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking if post is saved:", error);
        throw error;
    }
};
