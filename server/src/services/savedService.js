import Post from "../models/postModel.js";
import Saved from "../models/savedModel.js";
import User from "../models/userModel.js";

const savedService = {
    async savePost(userId, postId) {
        try {
            const saved = await Saved.create({ userId, postId });
            return saved;
        } catch (error) {
            console.error("Error saving post:", error);
        }
    },

    async unsavePost(userId, postId) {
        try {
            const saved = await Saved.findOne({ where: { userId, postId } });
            if (saved) {
                await saved.destroy();
            }
        } catch (error) {
            console.error("Error un-saving post:", error);
        }
    },

    async getSavedPosts(userId) {
        try {
            const savedPosts = await Saved.findAll({
                where: { userId },
                include: [{ model: Post, include: [User] }],
                order: [["createdAt", "DESC"]],
            });
            return savedPosts;
        } catch (error) {
            console.error("Error getting saved posts:", error);
        }
    },

    async isPostSaved(userId, postId) {
        try {
            const saved = await Saved.findOne({ where: { userId, postId } });
            return saved !== null;
        } catch (error) {
            console.error("Error checking if post is saved:", error);
        }
    },
};

export default savedService;
