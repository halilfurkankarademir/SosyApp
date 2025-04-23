import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.auroratones.online/api/comments",
    withCredentials: true,
});

export const createComment = async (params) => {
    try {
        const { postId, content } = params;
        const response = await apiClient.post(
            `/${postId}`,
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
        const response = await apiClient.delete(`/${commentId}`, {
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
        const response = await apiClient.get(`/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments by post ID:", error);
        throw error;
    }
};

export const getCommentCount = async (postId) => {
    try {
        const response = await apiClient.get(`/count/${postId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comment count:", error);
        throw error;
    }
};
