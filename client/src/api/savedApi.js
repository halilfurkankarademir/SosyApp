import axios from "axios";

// Create a dedicated apiClient for saved posts endpoints
const savedPostsClient = axios.create({
    baseURL: "https://api.auroratones.online/api/saved",
    withCredentials: true,
});

export const savePost = async (postId) => {
    try {
        return await savedPostsClient.post(`/${postId}`);
    } catch (error) {
        console.error("Error saving post:", error);
        throw error; // Re-throw to allow error handling in components
    }
};

export const unsavePost = async (postId) => {
    try {
        return await savedPostsClient.delete(`/${postId}`);
    } catch (error) {
        console.error("Error un-saving post:", error);
        throw error;
    }
};

export const getSavedPosts = async () => {
    try {
        const response = await savedPostsClient.get("/");
        return response.data;
    } catch (error) {
        console.error("Error getting saved posts:", error);
        throw error;
    }
};

export const isPostSaved = async (postId) => {
    try {
        const response = await savedPostsClient.get(`/check/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking if post is saved:", error);
        throw error;
    }
};
