import apiClient from "./apiClient";

export const createComment = async (params) => {
    try {
        const { postId, content } = params;
        const response = await apiClient.post(
            `/comments/${postId}`,
            {
                content,
            },
            {
                withCredentials: true,
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
        const response = await apiClient.delete(`/comments/${commentId}`, {
            withCredentials: true,
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
        const response = await apiClient.get(`/comments/count/${postId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comment count:", error);
        throw error;
    }
};
