import axios from "axios";

// Create a dedicated apiClient for user endpoints
const userClient = axios.create({
    baseURL: "https://api.auroratones.online/api/users",
    withCredentials: true,
});

export const deleteUser = async () => {
    try {
        const response = await userClient.delete("/");
        if (response.status !== 200) {
            throw new Error("Failed to delete user");
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(userClient.defaults.baseURL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await userClient.get("/current");
        if (response.status !== 200) {
            throw new Error("Failed to fetch user data");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(
            `${userClient.defaults.baseURL}/username/${username}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw error;
    }
};

export const updateUserProfile = async (updatedData) => {
    try {
        const response = await userClient.put("/", updatedData);
        if (response.status !== 200) {
            throw new Error("Failed to update user profile");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

export const getRandomUsersForRecommendation = async () => {
    try {
        const response = await userClient.get("/random");
        return response.data;
    } catch (error) {
        console.error("Error fetching random users:", error);
        throw error;
    }
};
