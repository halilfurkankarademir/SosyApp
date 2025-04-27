import { Op } from "@sequelize/core";
import likeRepository from "../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";
import logger from "../utils/logger.js";
import savedRepository from "../repositories/savedRepository.js";
import followService from "./followService.js";

const addPostDetailsForUser = (posts, userId) => {
    return posts.map((post) => {
        if (!post) {
            return null;
        }

        // Gonderiyi json'a cevirip isOwner, isLiked, isSaved degerlerini ekliyoruz
        const plainPost = post.toJSON();

        const isOwner = plainPost.userId === userId;
        const isLiked = plainPost.likes.some((like) => like.userId === userId);
        const isSaved = plainPost.saveds.some(
            (saved) => saved.userId === userId
        );
        return {
            ...plainPost,
            isOwner,
            isLiked,
            isSaved,
        };
    });
};

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
            await postRepository.deleteById(postId);
        } catch (error) {
            logger.error("Error deleting post:", error);
            throw new Error("Error deleting post");
        }
    },

    // Tum gonderileri getirir
    findPosts: async (userId) => {
        try {
            const { rows: posts, count } = await postRepository.findPosts();
            logger.info("Fetched all posts.");
            if (!posts) {
                throw new Error("No posts found");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return updatedPosts;
        } catch (error) {
            logger.error("Error fetching posts:", error);
            throw new Error("Error getting posts");
        }
    },

    getFeedPosts: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const followingUsersIds = await followService.getFollowingUsersId(
                userId
            );

            if (!followingUsersIds) {
                throw new Error("No posts found for this user");
            }

            const postsFilter = {
                [Op.or]: [
                    // Kullanicinin takip ettigi kullanicilarin gonderilerini getir
                    { userId: { [Op.in]: followingUsersIds } },
                    // Ya da kullanicinin kendi gonderilerini getir
                    { userId: userId },
                ],
            };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts) {
                throw new Error("No posts found");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching posts:", error);
            throw new Error("Error getting posts");
        }
    },

    // Gonderi idsine gore gonderiyi getirir
    getPostById: (postId) => {
        return postRepository.findById(postId);
    },

    getLikedPostsByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const postIds = await likeRepository.findLikedPostIdsByUserId(
                userId
            );

            logger.info("Fetched liked posts by user ID:", userId);
            if (!postIds) {
                throw new Error("No posts found for this user");
            }

            const postsFilter = { id: { [Op.in]: postIds } };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts) {
                throw new Error("No posts found for this user");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching liked posts by user ID:", error);
            throw new Error("Error getting liked posts by user ID");
        }
    },

    getSavedPostsByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const postIds = await savedRepository.findAllSavedPostIdsByUser(
                userId
            );
            logger.info("Fetched saved posts by user ID:", userId);
            if (!postIds) {
                throw new Error("No posts found for this user");
            }

            const postsFilter = { id: { [Op.in]: postIds } };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            if (!posts) {
                throw new Error("No posts found for this user");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching saved posts by user ID:", error);
            throw new Error("Error getting saved posts by user ID");
        }
    },

    //Belli bir kullaniciya ait gonderileri getirir
    getPostByUserId: async (userId, page, limit) => {
        try {
            const offset = (page - 1) * limit;

            const postsFilter = { userId: userId };

            const { rows: posts, count } = await postRepository.findPosts({
                where: postsFilter,
                offset,
                limit,
            });

            logger.info("Fetched posts by user ID:", userId);
            if (!posts) {
                throw new Error("No posts found for this user");
            }

            const updatedPosts = addPostDetailsForUser(posts, userId);

            return { posts: updatedPosts, count };
        } catch (error) {
            logger.error("Error fetching posts by user ID:", error);
            throw new Error("Error getting posts by user ID");
        }
    },
};

export default PostService;
