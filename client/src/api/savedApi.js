import { getCookie } from "../utils/helpers";
import apiClient from "./apiClient";

export const savePost = async (postId) => {
    try {
        const csrfToken = getCookie("csrfToken");
        return await apiClient.post(
            `/saved/${postId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            }
        );
    } catch (error) {
        console.error("Error saving post:", error);
        throw error; // Re-throw to allow error handling in components
    }
};

export const unsavePost = async (postId) => {
    try {
        const csrfToken = getCookie("csrfToken");
        return await apiClient.delete(`/saved/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
        });
    } catch (error) {
        console.error("Error un-saving post:", error);
        throw error;
    }
};

export const getSavedPosts = async (page, filter) => {
    try {
        const response = await apiClient.get("/saved/me", {
            params: { page, filter },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting saved posts:", error);
        throw error;
    }
};
