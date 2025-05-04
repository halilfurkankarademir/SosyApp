import apiClient from "./apiClient";

export const followUser = async (followingId) => {
    // Belirli bir id'li kullanıcıyı takip etme
    try {
        return await apiClient
            .post(`/follows/${followingId}`, {})
            .then((response) => response.data);
    } catch (error) {
        console.error("Error following user:", error);
    }
};

export const unfollowUser = async (followingId) => {
    // Belirli bir id'li kullanıcıyı takipten cikartma
    try {
        return await apiClient
            .delete(`/follows/${followingId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
};

export const removeFollower = async (followerId) => {
    try {
        return await apiClient
            .delete(`/follows/follower/${followerId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
};

export const checkFollowStatus = async (followingId) => {
    // Aktif kullanıcının ilgili kullanıcıyı takip edip takip etmedigini kontrol eder
    try {
        return await apiClient
            .get(`/follows/check/${followingId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error checking follow status:", error);
    }
};

export const getFollowers = async (filter) => {
    // Aktif kullanıcının tum takipcilerini getirme
    try {
        return await apiClient
            .get("/follows/followers", {
                params: { filter },
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error getting followers:", error);
    }
};

export const getFollowings = async (filter) => {
    // Aktif kullanıcının tum takip ettiklerini getirme
    try {
        return await apiClient
            .get("/follows/following", {
                params: { filter },
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error getting followings:", error);
    }
};

export const getFollowersByUserId = async (userId) => {
    // Kullanıcı id'sini alarak api/follows/followers/:userId endpointine get isteği gonderen bir fonksiyon
    // Bu istek, kullanıcının takipcilerini alır ve sunucudan gelen yanıtı döner
    try {
        return await apiClient
            .get(`/follows/followers/${userId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error getting followers by user ID:", error);
    }
};

export const getFollowingByUserId = async (userId) => {
    // Kullanıcı id'sini alarak api/follows/following/:userId endpointine get isteği gonderen bir fonksiyon
    // Bu istek, kullanıcının takip ettiklerini alır ve sunucudan gelen yanıtı döner
    try {
        return await apiClient
            .get(`/follows/following/${userId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error getting following by user ID:", error);
    }
};
