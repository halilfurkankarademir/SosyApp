import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Saved from "../models/savedModel.js";

const likeRepository = {
    async create(userId, postId) {
        try {
            const like = await Like.create({ userId, postId });
            return like;
        } catch (error) {
            console.error("Error in likeRepository.create:", error);
            throw new Error("Database error creating like: " + error.message);
        }
    },

    async deleteByUserIdAndPostId(userId, postId) {
        try {
            const result = await Like.destroy({ where: { userId, postId } });
            return result;
        } catch (error) {
            console.error(
                "Error in likeRepository.deleteByUserIdAndPostId:",
                error
            );
            throw new Error("Database error deleting like: " + error.message);
        }
    },

    async findByPostId(postId) {
        try {
            const likes = await Like.findAll({ where: { postId } });
            return likes;
        } catch (error) {
            console.error("Error in likeRepository.findByPostId:", error);
            throw new Error(
                "Database error finding likes by post ID: " + error.message
            );
        }
    },

    async findOneByUserIdAndPostId(userId, postId) {
        try {
            const like = await Like.findOne({ where: { userId, postId } });
            return like;
        } catch (error) {
            console.error(
                "Error in likeRepository.findOneByUserIdAndPostId:",
                error
            );
            throw new Error(
                "Database error finding specific like: " + error.message
            );
        }
    },

    async findLikedPostIdsByUserId(userId) {
        try {
            const likes = await Like.findAll({
                where: { userId },
                order: [["createdAt", "DESC"]],
                attributes: ["postId"],
            });

            if (!likes) {
                return [];
            }

            const postIds = likes.map((like) => like.postId);

            return postIds;
        } catch (error) {
            console.log("Error finding liked post IDs by user ID:", error);
        }
    },

    async findWithPostsByUserId(userId) {
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
                                as: "user", // Alias for the post's owner
                                attributes: [
                                    "uid", // Changed from id if user model uses uid
                                    "username",
                                    "profilePicture",
                                    "firstName",
                                    "lastName",
                                ],
                            },
                            {
                                model: Like, // Count or check likes on the post
                                attributes: ["id"], // Only need existence or count
                            },
                            {
                                model: Comment, // Count or check comments on the post
                                attributes: ["id"], // Only need existence or count
                            },
                            {
                                model: Saved, // Check if saved by *someone*, not necessarily the current user
                                attributes: ["id"], // Only need existence or count
                            },
                        ],
                    },
                ],
                order: [[Post, "createdAt", "DESC"]], // Optional: Order liked posts by creation date
            });
            return likes;
        } catch (error) {
            console.error(
                "Error in likeRepository.findWithPostsByUserId:",
                error
            );
            throw new Error(
                "Database error finding likes with posts by user ID: " +
                    error.message
            );
        }
    },
};

export default likeRepository;
