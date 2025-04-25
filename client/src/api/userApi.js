import apiClient from "./apiClient";

// 1. KULLANICI BİLGİSİ GETİRME FONKSİYONLARI
export const getCurrentUser = async () => {
    // Cookieleri kullanarak aktif giris yapan kullanıcının bilgilerini getirme
    try {
        const response = await apiClient.get("/users/me");
        if (response.status !== 200)
            throw new Error("Failed to fetch user data");
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
};

export const getUserByUsername = async (username) => {
    // Kullanici adi ile kullanici bilgilerini getirme
    try {
        const response = await apiClient.get(`/users/username/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    // Tüm kullanıcıları getirme
    try {
        const response = await apiClient.get("/users/");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// 2. PROFİL GÜNCELLEME FONKSİYONU
export const updateUserProfile = async (updatedData) => {
    // Aktif giris yapan kullanıcının profilini güncelleme
    try {
        const response = await apiClient.put("/users/me", updatedData);
        if (response.status !== 200)
            throw new Error("Failed to update user profile");
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

// 3. KULLANICI SİLME FONKSİYONU
export const deleteUser = async () => {
    // Aktif giris yapan kullanıcının hesabını silme
    try {
        const response = await apiClient.delete("/users/me");
        if (response.status !== 200) throw new Error("Failed to delete user");
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
