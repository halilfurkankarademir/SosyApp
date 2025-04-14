import postRepository from "../repositories/postRepository.js";
import logger from "../utils/logger.js";

const PostService = {
    //Gonderi olusturur
    createPost: async (postData) => {
        try {
            logger.info("Creating post with data:", postData);
            const newPost = await postRepository.create(postData);
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
            await postRepository.delete(postId);
        } catch (error) {
            logger.error("Error deleting post:", error);
            throw new Error("Error deleting post");
        }
    },

    // Tum gonderileri getirir
    getAllPosts: async () => {
        try {
            const posts = await postRepository.getAll();
            logger.info("Fetched all posts.");
            if (!posts) {
                throw new Error("No posts found");
            }
            return posts;
        } catch (error) {
            logger.error("Error fetching posts:", error);
            throw new Error("Error getting posts");
        }
    },

    // Gonderi idsine gore gonderiyi getirir
    getPostById: (postId) => {
        return postRepository.getById(postId);
    },

    //Belli bir kullaniciya ait gonderileri getirir
    getPostByUserId: async (userId) => {
        try {
            const post = await postRepository.getPostByUserId(userId);
            logger.info("Fetched posts by user ID:", post);
            if (!post) {
                throw new Error("No posts found for this user");
            }
            return post;
        } catch (error) {
            logger.error("Error fetching posts by user ID:", error);
            throw new Error("Error getting posts by user ID");
        }
    },
};

export default PostService;
