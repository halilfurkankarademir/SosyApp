// Kullanıcı Profili İşlemleri
import axios from "axios";

export const changeUserPassword = (userId, oldPassword, newPassword) => {
    // Kullanıcının şifresini değiştirir.
};

export const deactivateUserAccount = (userId) => {
    // Kullanıcı hesabını devre dışı bırakır.
};

export const deleteUserAccount = (userId) => {
    // Kullanıcı hesabını kalıcı olarak siler.
};

// Arkadaşlık İşlemleri
export const sendFriendRequest = (userId, friendId) => {
    // Bir kullanıcıya arkadaşlık isteği gönderir.
};

export const acceptFriendRequest = (userId, friendId) => {
    // Gelen arkadaşlık isteğini kabul eder.
};

export const rejectFriendRequest = (userId, friendId) => {
    // Gelen arkadaşlık isteğini reddeder.
};

export const removeFriend = (userId, friendId) => {
    // Arkadaş listesinden bir kullanıcıyı çıkarır.
};

export const blockUser = (userId, blockedUserId) => {
    // Bir kullanıcıyı engeller.
};

export const unblockUser = (userId, blockedUserId) => {
    // Bir kullanıcının engelini kaldırır.
};

// Bildirim ve Ayarlar
export const updateNotificationSettings = (userId, settings) => {
    // Kullanıcının bildirim ayarlarını günceller.
};

export const updatePrivacySettings = (userId, settings) => {
    // Kullanıcının gizlilik ayarlarını günceller.
};

// Diğer İşlemler
export const searchUsers = (query) => {
    // Kullanıcıları isme, emaile veya diğer kriterlere göre arar.
};

export const getUserActivityLogs = (userId) => {
    // Kullanıcının aktivite geçmişini getirir.
};

export const reportUser = (userId, reportedUserId, reason) => {
    // Bir kullanıcıyı şikayet eder.
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
