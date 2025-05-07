import { getCookie } from "../utils/helpers";
import apiClient from "./apiClient";

export const createComment = async (params) => {
    try {
        const csrfToken = getCookie("csrfToken");
        const { postId, content } = params;
        const response = await apiClient.post(
            `/comments/${postId}`,
            {
                content,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Yorum oluşturulamadı";
        console.error("Error creating comment:", errorMessage);
        throw new Error(errorMessage); // Kullanıcı dostu mesaj
    }
};

export const deleteComment = async (commentId) => {
    try {
        const csrfToken = getCookie("csrfToken");
        const response = await apiClient.delete(`/comments/${commentId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await apiClient.get(`/comments/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments by post ID:", error);
        throw error;
    }
};

export const getCommentCount = async (postId) => {
    try {
        const response = await apiClient.get(`/comments/count/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comment count:", error);
        throw error;
    }
};
