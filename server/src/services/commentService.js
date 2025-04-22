import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

const commentService = {
    createComment: async (userId, postId, content) => {
        try {
            const comment = await Comment.create({ userId, postId, content });
            return comment;
        } catch (error) {
            throw new Error("Error creating comment: " + error.message);
        }
    },

    deleteComment: async (commentId) => {
        try {
            await Comment.destroy({ where: { id: commentId } });
        } catch (error) {
            throw new Error("Error deleting comment: " + error.message);
        }
    },

    getAllComments: async (postId) => {
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
            throw new Error("Error getting comments: " + error.message);
        }
    },

    getCommentCount: async (postId) => {
        try {
            const commentCount = await Comment.count({ where: { postId } });
            return commentCount;
        } catch (error) {
            throw new Error("Error getting comment count: " + error.message);
        }
    },
};

export default commentService;
