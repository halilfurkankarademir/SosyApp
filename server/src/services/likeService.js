import Like from "../models/likeModel.js";

const likeService = {
    async createLike(userId, postId) {
        try {
            const like = await Like.create({ userId, postId });
            return like;
        } catch (error) {
            throw new Error("Error creating like: " + error.message);
        }
    },
    async deleteLike(userId, postId) {
        try {
            await Like.destroy({ where: { userId, postId } });
        } catch (error) {
            throw new Error("Error deleting like: " + error.message);
        }
    },

    async checkLike(userId, postId) {
        try {
            const like = await Like.findOne({ where: { userId, postId } });
            // Boolen degere cevirme ve return islemi
            return !!like;
        } catch (error) {
            throw new Error("Error checking like: " + error.message);
        }
    },
};

export default likeService;
