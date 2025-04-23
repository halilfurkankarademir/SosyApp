import axios from "axios";

// Create a dedicated apiClient for likes endpoints
const likesClient = axios.create({
    baseURL: "https://api.auroratones.online/api/likes",
    withCredentials: true,
});

export const addLikePost = async (postId) => {
    try {
        return await likesClient.post(`/${postId}`);
    } catch (error) {
        console.error("Error liking post:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const removeLikeFromPost = async (postId) => {
    try {
        return await likesClient.delete(`/${postId}`);
    } catch (error) {
        console.error("Error unliking post:", error);
        throw error;
    }
};

export const getAllLikes = async (postId) => {
    try {
        return await likesClient.get(`/post/${postId}`);
    } catch (error) {
        console.error("Error getting likes:", error);
        throw error;
    }
};

export const checkLike = async (postId) => {
    try {
        return await likesClient.get(`/${postId}/check`);
    } catch (error) {
        console.error("Error checking like:", error);
        throw error;
    }
};

export const getLikesByUserId = async () => {
    try {
        const response = await likesClient.get("/user");
        return response.data;
    } catch (error) {
        console.error("Error getting likes by user:", error);
        throw error;
    }
};
