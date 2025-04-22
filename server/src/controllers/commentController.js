// yorum ekleme islemleri icin controllerlar
import commentService from "../services/commentService.js";
import { sendCommentNotification } from "../services/notificationService.js";
import PostService from "../services/postService.js";

const commentController = {
    createComment: async (req, res) => {
        try {
            const userId = req.user.uid;
            const postId = req.params.postId;
            const content = req.body.content;
            const comment = await commentService.createComment(
                userId,
                postId,
                content
            );
            const postDetails = await PostService.getPostById(postId);
            const postOwnerId = postDetails.user.uid;
            sendCommentNotification(req.user, postOwnerId, postId);
            res.status(201).json(comment);
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            await commentService.deleteComment(commentId);
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getCommentsByPostId: async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await commentService.getAllComments(postId);
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error getting comments:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getCommentCount: async (req, res) => {
        try {
            const postId = req.params.postId;
            const commentCount = await commentService.getCommentCount(postId);
            res.status(200).json(commentCount);
        } catch (error) {
            console.error("Error getting comment count:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default commentController;
