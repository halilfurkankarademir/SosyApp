import apiClient from "./apiClient";

const isDevMode = import.meta.env.VITE_NODE_ENV === "development";

export const getAdminDashboardStats = () => {
    try {
        return apiClient.get("/admin/dashboard").then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error getting dashboard stats:", error);
    }
};

export const getAllUsersForAdmin = (page, filter) => {
    try {
        return apiClient
            .get("/admin/users", {
                params: { page, filter },
            })
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error getting all users:", error);
    }
};

export const getAllPostsForAdmin = (page, filter) => {
    try {
        return apiClient
            .get("/admin/posts", {
                params: { page, filter },
            })
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error getting all users:", error);
    }
};

export const updateUserRoleForAdmin = async (userId, newRole) => {
    try {
        return apiClient
            .put(`/admin/users/${userId}/role`, { role: newRole })
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error updating user role:", error);
        throw error;
    }
};

export const deletePostForAdmin = async (postId) => {
    try {
        return apiClient
            .delete(`/admin/posts/${postId}`)
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error deleting post:", error);
        throw error;
    }
};

export const deleteCommentForAdmin = async (commentId) => {
    try {
        return apiClient
            .delete(`/admin/comments/${commentId}`)
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error deleting comment:", error);
        throw error;
    }
};

export const deleteUserForAdmin = async (userId, userRole) => {
    try {
        console.log("Deleting user with ID:", userId);
        return apiClient
            .delete(`/admin/users/${userId}?role=${userRole}`)
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error deleting user:", error);
        throw error;
    }
};

export const getAppSettingsForAdmin = () => {
    try {
        return apiClient.get("/admin/settings").then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error getting app settings:", error);
    }
};

export const updateAppSettingsForAdmin = async (settings) => {
    try {
        const response = await apiClient.put("/admin/settings", settings);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Ayarlar güncellenirken bir hata oluştu",
        };
    }
};

export const checkMaintenanceModeForAdmin = async () => {
    try {
        return apiClient
            .get("/admin/check-maintenance")
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error checking maintenance mode:", error);
    }
};

export const getAllCommentsForAdmin = (page, filter) => {
    try {
        return apiClient
            .get("/admin/comments", { params: { page, filter } })
            .then((res) => res.data);
    } catch (error) {
        isDevMode && console.log("Error getting all comments:", error);
    }
};
