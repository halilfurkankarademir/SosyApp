/**
 * @fileoverview Gönderi (Post) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/postController
 */

import diContainer from "../config/dependencyInjection.js";
import { getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { postService } = diContainer;

/**
 * @description Gönderi CRUD işlemleri ve listeleme için controller fonksiyonlarını içerir.
 */
const postController = {
    /**
     * @description Yeni bir gönderi oluşturur. İstek gövdesinden gönderi verilerini alır ve kullanıcı ID'sini ekler.
     * @route POST /posts/
     * @param {object} req - Express istek nesnesi. `req.body` gönderi verilerini, `req.user.uid` kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    createPost: async (req, res, next) => {
        try {
            logger.info("Creating post...");

            let postData = req.body;

            postData = {
                ...postData,
                userId: req.user.uid,
            };

            const newPost = await postService.createPost(postData);

            if (!newPost) {
                return res.status(400).json({ error: "Post creation failed" });
            }

            logger.info("Post created successfully");

            res.status(201).json(newPost);
        } catch (error) {
            logger.error("Error creating post:", error);
            res.status(500).json({ error: "Error creating post" });
            next(error);
        }
    },

    /**
     * @description Belirli bir gönderiyi ID'sine göre siler.
     * @route DELETE /posts/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` silinecek gönderinin ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deletePost: async (req, res, next) => {
        try {
            logger.info("Deleting post...");
            const postId = req.params.postId;
            await postService.deletePost(postId);
            logger.info("Post deleted successfully");
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            logger.error("Error deleting post:", error);
            res.status(500).json({ error: "Error deleting post" });
            next(error);
        }
    },

    /**
     * @description Belirli bir gönderiyi ID'sine göre getirir.
     * @route GET /posts/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` getirilecek gönderinin ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getPostById: async (req, res, next) => {
        try {
            logger.info("Getting post...");
            const postId = req.params.postId;
            const post = await postService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            logger.info("Post fetched successfully");
            res.status(200).json(post);
        } catch (error) {
            logger.error("Error getting post:", error);
            res.status(error.status).json({ error: "Error getting post" });
            next(error);
        }
    },

    /**
     * @description Belirli bir kullanıcının gönderilerini listeler (sayfalama ile).
     * @route GET /posts/user/:userId?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.params.userId` kullanıcı ID'sini, `req.query` sayfalama bilgilerini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getPostsByUserId: async (req, res, next) => {
        try {
            logger.info("Getting posts by user ID...");
            const userId = req.params.userId;
            const { offset, limit } = getPagination(req);
            const posts = await postService.getPostsByUserId(
                userId,
                offset,
                limit
            );
            if (!posts) {
                return res
                    .status(404)
                    .json({ error: "No posts found for this user" });
            }
            logger.info("Posts fetched successfully");
            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting posts by user ID:", error);
            res.status(500).json({ error: "Error getting posts by user ID" });
            next(error);
        }
    },

    /**
     * @description Aktif kullanıcının takip ettiği kişilerin gönderilerini (feed) listeler (sayfalama ile).
     * @route GET /posts/feed?page={pageNumber}&limit={pageSize}
     */
    getFeedPosts: async (req, res, next) => {
        try {
            logger.info("Getting feed posts...");
            const userId = req.user.uid;
            const { limit, offset } = getPagination(req);
            const posts = await postService.getFeedPosts(userId, limit, offset);
            if (!posts) {
                return res
                    .status(404)
                    .json({ error: "No posts found for this user" });
            }
            logger.info("Feed posts fetched successfully");
            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting feed posts:", error);
            res.status(500).json({ error: "Error getting feed posts" });
            next(error);
        }
    },

    getTrendingPosts: async (req, res, next) => {
        try {
            logger.info("Getting trending posts...");
            const userId = req.user.uid;
            const { offset, limit } = getPagination(req);
            const posts = await postService.getTrendingPosts(
                userId,
                offset,
                limit
            );
            if (!posts) {
                return res.status(404).json({ error: "No posts found" });
            }
            logger.info("Trending posts fetched successfully");
            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting trending posts:", error);
            next(error);
        }
    },
};

export default postController;
