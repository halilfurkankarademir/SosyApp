import apiClient from "./apiClient";

export const addLikePost = async (postId) => {
    try {
        return await apiClient.post(`/likes/${postId}`);
    } catch (error) {
        console.error("Error liking post:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const removeLikeFromPost = async (postId) => {
    try {
        return await apiClient.delete(`/likes/${postId}`);
    } catch (error) {
        console.error("Error unliking post:", error);
        throw error;
    }
};

export const getAllLikes = async (postId) => {
    try {
        return await apiClient.get(`/likes/post/${postId}`);
    } catch (error) {
        console.error("Error getting likes:", error);
        throw error;
    }
};

export const checkLike = async (postId) => {
    try {
        return await apiClient.get(`/likes/${postId}/check`);
    } catch (error) {
        console.error("Error checking like:", error);
        throw error;
    }
};

export const getLikesByUserId = async (page) => {
    try {
        const response = await apiClient.get("/likes/user", {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting likes by user:", error);
        throw error;
    }
};
