import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

export default {
    async createComment(userId, postId, content) {
        try {
            const comment = await Comment.create({ userId, postId, content });
            return comment;
        } catch (error) {
            logger.error("Database error creating comment:", error);
            throw new Error(
                "Database error creating comment: " + error.message
            );
        }
    },

    async deleteComment(commentId) {
        try {
            await Comment.destroy({ where: { id: commentId } });
        } catch (error) {
            logger.error("Error deleting comment:", error);
            throw new Error("Error deleting comment: " + error.message);
        }
    },

    async getCommentsByPostId(postId) {
        try {
            const comments = await Comment.findAll({
                where: { postId },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: [
                            "uid",
                            "username",
                            "profilePicture",
                            "firstName",
                            "lastName",
                        ],
                    },
                ],
            });
            return comments;
        } catch (error) {
            logger.error("Error getting comments by post ID:", error);
            throw new Error(
                "Error getting comments by post ID: " + error.message
            );
        }
    },

    async getCommentCount(postId) {
        try {
            const commentCount = await Comment.count({ where: { postId } });
            return commentCount;
        } catch (error) {
            logger.error("Error getting comment count:", error);
            throw new Error("Error getting comment count: " + error.message);
        }
    },
};
