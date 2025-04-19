import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

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

    async getAllLikes(postId) {
        try {
            const likes = await Like.findAll({ where: { postId } });
            return likes;
        } catch (error) {
            throw new Error("Error getting likes: " + error.message);
        }
    },

    async getLikesByUserId(userId) {
        try {
            const likes = await Like.findAll({
                where: { userId },
                include: [
                    {
                        model: Post,
                        attributes: [
                            "id",
                            "userId",
                            "content",
                            "media",
                            "createdAt",
                        ],
                        include: [
                            {
                                model: User,
                                as: "user", // Post'un sahibi olan kullanıcı
                                attributes: [
                                    "uid",
                                    "username",
                                    "profilePicture",
                                    "firstName",
                                    "lastName",
                                ],
                            },
                        ],
                    },
                ],
            });
            return likes;
        } catch (error) {
            throw new Error("Error getting likes by user ID: " + error.message);
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
