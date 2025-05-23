import { getCookie } from "../utils/helpers";
import apiClient from "./apiClient";

export const addLikePost = async (postId) => {
    try {
        const csrfToken = getCookie("csrfToken");
        return await apiClient.post(
            `/likes/${postId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            }
        );
    } catch (error) {
        console.error("Error liking post:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const removeLikeFromPost = async (postId) => {
    try {
        const csrfToken = getCookie("csrfToken");
        return await apiClient.delete(`/likes/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
        });
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

export const getLikesByUserId = async (page, filter) => {
    try {
        const response = await apiClient.get("/likes/me", {
            params: { page, filter },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting likes by user:", error);
        throw error;
    }
};
