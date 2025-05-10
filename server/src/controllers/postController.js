/**
 *  Gönderi (Post) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 */

import diContainer from "../config/dependencyInjection.js";
import { extractPostData, getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { postService } = diContainer;

/**
 * Gönderi CRUD işlemleri ve listeleme için controller fonksiyonlarını içerir.
 */
const postController = {
    /**
     *  Yeni bir gönderi oluşturur. İstek gövdesinden gönderi verilerini alır ve kullanıcı ID'sini ekler.
     */
    createPost: async (req, res, next) => {
        try {
            logger.info("Creating post...");

            const postData = extractPostData(req.body, req.user.uid);

            const newPost = await postService.createPost(postData);

            logger.info("Post created successfully");

            res.status(201).json(newPost);
        } catch (error) {
            logger.error("Error creating post:", error);
            next(error);
        }
    },

    /**
     * Belirli bir gönderiyi ID'sine göre siler.
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
            next(error);
        }
    },

    /**
     * Belirli bir gönderiyi ID'sine göre getirir.
     */
    getPostById: async (req, res, next) => {
        try {
            const postId = req.params.postId;

            logger.info("Getting post..." + postId);

            const post = await postService.getPostById(postId);

            logger.info("Post fetched successfully");

            res.status(200).json(post);
        } catch (error) {
            logger.error("Error getting post:", error);
            next(error);
        }
    },

    /**
     * Belirli bir kullanıcının gönderilerini listeler (sayfalama ile).
     */
    getPostsByUserId: async (req, res, next) => {
        try {
            logger.info("Getting posts by user ID...");

            const userId = req.params.userId;
            const requestedUserId = req.user.uid;

            const { offset, limit } = getPagination(
                req.query.page,
                req.query.limit
            );

            const posts = await postService.getPostsByUserId(
                userId,
                offset,
                limit,
                requestedUserId
            );

            logger.info("Posts fetched successfully");

            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting posts by user ID:", error);
            next(error);
        }
    },

    /**
     * Aktif kullanıcının takip ettiği kişilerin gönderilerini (feed) listeler (sayfalama ile).
     */
    getFeedPosts: async (req, res, next) => {
        try {
            logger.info("Getting feed posts...");

            const userId = req.user.uid;

            const { limit, offset } = getPagination(
                req.query.page,
                req.query.limit
            );

            const posts = await postService.getFeedPosts(userId, limit, offset);

            logger.info("Feed posts fetched successfully");

            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting feed posts:", error);
            next(error);
        }
    },

    /**
     * Trendli gönderileri listeler (sayfalama ile).
     */
    getTrendingPosts: async (req, res, next) => {
        try {
            logger.info("Getting trending posts...");

            const userId = req.user.uid;

            const { offset, limit } = getPagination(
                req.query.page,
                req.query.limit
            );

            const posts = await postService.getTrendingPosts(
                userId,
                offset,
                limit
            );

            logger.info("Trending posts fetched successfully");

            res.status(200).json(posts);
        } catch (error) {
            logger.error("Error getting trending posts:", error);
            next(error);
        }
    },
};

export default postController;
