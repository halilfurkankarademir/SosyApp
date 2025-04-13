import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

const PostService = {
    //Gonderi olusturur
    createPost: async (postData) => {
        try {
            logger.info("Creating post with data:", postData);
            const newPost = await Post.create(postData);
            return newPost;
        } catch (error) {
            logger.error("Error creating post:", error);
            throw new Error("Error creating post");
        }
    },

    // Gonderiyi siler
    deletePost: async (postId) => {
        try {
            logger.info("Deleting post with ID:", postId);
            const post = await Post.findByPk(postId);
            if (!post) {
                throw new Error("Post not found");
            }
            await post.destroy();
            return { success: true };
        } catch (error) {
            logger.error("Error deleting post:", error);
            throw new Error("Error deleting post");
        }
    },

    // Tum gonderileri getirir
    getAllPosts: async () => {
        try {
            const posts = await Post.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: ["id", "username", "profilePicture"],
                    },
                ],
            });
            return posts;
        } catch (error) {
            logger.error("Error fetching posts:", error);
            throw new Error("Error getting posts");
        }
    },

    // Gonderi idsine gore gonderiyi getirir
    getPostById: (postId) => {
        return Post.findByPk(postId);
    },

    //Belli bir kullaniciya ait gonderileri getirir
    getPostByUserId: async (userId) => {
        try {
            const posts = await Post.findAll({ where: { userId } });
            return posts;
        } catch (error) {
            logger.error("Error fetching posts by user ID:", error);
            throw new Error("Error getting posts by user ID");
        }
    },
};

export default PostService;
