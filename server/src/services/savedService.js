import savedRepository from "../repositories/savedRepository.js";

const savedService = {
    async savePost(userId, postId) {
        try {
            return await savedRepository.createSaved(userId, postId);
        } catch (error) {
            console.error("Error saving post:", error);
            throw error;
        }
    },

    async unsavePost(userId, postId) {
        try {
            return await savedRepository.deleteSaved(userId, postId);
        } catch (error) {
            console.error("Error un-saving post:", error);
            throw error;
        }
    },

    async getSavedPosts(userId) {
        try {
            return await savedRepository.findAllSavedPostsByUser(userId);
        } catch (error) {
            console.error("Error getting saved posts:", error);
            throw error;
        }
    },

    async isPostSaved(userId, postId) {
        try {
            const saved = await savedRepository.findSavedByUserAndPost(
                userId,
                postId
            );
            return saved !== null;
        } catch (error) {
            console.error("Error checking if post is saved:", error);
            throw error;
        }
    },

    async findSavedPostIdsByUserId(userId) {
        try {
            return await savedRepository.findAllSavedPostIdsByUser(userId);
        } catch (error) {
            console.log("Error finding saved post IDs by user ID:", error);
            throw error;
        }
    },
};

export default savedService;
