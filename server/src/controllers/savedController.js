import PostService from "../services/postService.js";
import savedService from "../services/savedService.js";

const savedController = {
    savePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            const saved = await savedService.savePost(userId, postId);
            res.status(201).json(saved);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    unsavePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            await savedService.unsavePost(userId, postId);
            res.status(200).json({ message: "Post un-saved successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getSavedPosts: async (req, res) => {
        try {
            const userId = req.user.uid;
            const savedPosts = await PostService.getSavedPostsByUserId(userId);
            res.status(200).json(savedPosts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    checkPostSaved: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            const isSaved = await savedService.isPostSaved(userId, postId);
            res.status(200).json(isSaved);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default savedController;
