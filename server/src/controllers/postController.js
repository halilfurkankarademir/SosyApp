import PostService from "../services/postService.js";

// gonderi islemleri icin controllerlar

const postController = {
    createPost: async (req, res) => {
        try {
            console.log("Creating post with data:");
            const newPost = await PostService.createPost(req.body);
            res.status(201).json(newPost);
        } catch (error) {
            console.log(req.body);
            console.error("Error creating post:", error);
            res.status(500).json({ error: "Error creating post" });
        }
    },

    deletePost: async (req, res) => {
        try {
            await PostService.deletePost(req.params.postId);
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ error: "Error deleting post" });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await PostService.getAllPosts();
            if (!posts) {
                return res.status(404).json({ error: "No posts found" });
            }
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error getting posts:", error);
            res.status(500).json({ error: "Error getting posts" });
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await PostService.getPostById(req.params.postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.status(200).json(post);
        } catch (error) {
            console.error("Error getting post:", error);
            res.status(500).json({ error: "Error getting post" });
        }
    },
};

export default postController;
