// Kullanıcı Profili İşlemleri
import axios from "axios";

export const deleteUser = async () => {
    // Mevcut kullanıcının hesabını siler.
    return axios
        .delete("http://localhost:3000/api/users", {
            withCredentials: true,
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("Failed to delete user");
            }
            return response.data;
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            throw error;
        });
};

export const getAllUsers = async () => {
    // Tüm kullanıcıları listeler.
    return axios
        .get("http://localhost:3000/api/users")
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching users:", error);
            throw error;
        });
};

export const getCurrentUser = async () => {
    // Mevcut kullanıcının bilgilerini getirir.
    return axios
        .get("http://localhost:3000/api/users/current", {
            withCredentials: true,
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("Failed to fetch user data");
            }
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching current user:", error);
            throw error;
        });
};

export const getUserByUsername = async (username) => {
    // Belirli bir kullanıcının detaylarını getirir.
    return axios
        .get(`http://localhost:3000/api/users/username/${username}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching user by username:", error);
            throw error;
        });
};

export const updateUserProfile = async (updatedData) => {
    return axios
        .put(`http://localhost:3000/api/users`, updatedData, {
            withCredentials: true,
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("Failed to update user profile");
            }
            return response.data;
        })
        .catch((error) => {
            console.error("Error updating user profile:", error);
            throw error;
        });
};

export const getRandomUsersForRecommendation = async () => {
    return axios
        .get("http://localhost:3000/api/users/random", {
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching random users:", error);
            throw error;
        });
};
