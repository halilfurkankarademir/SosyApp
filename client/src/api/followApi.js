import axios from "axios";

export const followUser = async (followingId) => {
    try {
        return await axios.post(
            `http://localhost:3000/api/follows/${followingId}`,
            {},
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error following user:", error);
    }
};

export const unfollowUser = async (followingId) => {
    try {
        return await axios.delete(
            `http://localhost:3000/api/follows/${followingId}`,
            { withCredentials: true }
        );
    } catch (error) {
        console.error("Error unfollowing user:", error);
    }
};

export const checkFollowStatus = async (followingId) => {
    try {
        return await axios
            .get(`http://localhost:3000/api/follows/check/${followingId}/`, {
                withCredentials: true,
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error checking follow status:", error);
    }
};
