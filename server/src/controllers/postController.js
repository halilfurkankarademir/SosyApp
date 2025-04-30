/**
 * @fileoverview Gönderi (Post) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/postController
 */

import PostService from "../services/postService.js";

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
    createPost: async (req, res) => {
        try {
            let postData = req.body;
            postData = {
                ...postData,
                userId: req.user.uid,
            };
            const newPost = await PostService.createPost(postData);
            if (!newPost) {
                return res.status(400).json({ error: "Post creation failed" });
            }
            res.status(201).json(newPost);
        } catch (error) {
            console.log(req.body);
            console.error("Error creating post:", error);
            res.status(500).json({ error: "Error creating post" });
        }
    },

    /**
     * @description Belirli bir gönderiyi ID'sine göre siler.
     * @route DELETE /posts/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` silinecek gönderinin ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deletePost: async (req, res) => {
        try {
            await PostService.deletePost(req.params.postId);
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ error: "Error deleting post" });
        }
    },

    /**
     * @description Tüm gönderileri (veya belirli bir filtreye göre) listeler. Aktif kullanıcının ID'si de gönderilir.
     * @route GET /posts/
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    findPosts: async (req, res) => {
        try {
            const userId = req.user.uid;
            const posts = await PostService.findPosts(userId);
            if (!posts) {
                return res.status(404).json({ error: "No posts found" });
            }
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error getting posts:", error);
            res.status(500).json({ error: "Error getting posts" });
        }
    },

    /**
     * @description Belirli bir gönderiyi ID'sine göre getirir.
     * @route GET /posts/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` getirilecek gönderinin ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getPostById: async (req, res) => {
        try {
            const postId = req.params.postId;
            const post = await PostService.getPostById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.status(200).json(post);
        } catch (error) {
            console.error("Error getting post:", error);
            res.status(500).json({ error: "Error getting post" });
        }
    },

    /**
     * @description Belirli bir kullanıcının gönderilerini listeler (sayfalama ile).
     * @route GET /posts/user/:userId?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.params.userId` kullanıcı ID'sini, `req.query` sayfalama bilgilerini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getPostsByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            const posts = await PostService.getPostsByUserId(
                userId,
                page,
                limit
            );
            if (!posts) {
                return res
                    .status(404)
                    .json({ error: "No posts found for this user" });
            }
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error getting posts by user ID:", error);
            res.status(500).json({ error: "Error getting posts by user ID" });
        }
    },

    /**
     * @description Aktif kullanıcının takip ettiği kişilerin gönderilerini (feed) listeler (sayfalama ile).
     * @route GET /posts/feed?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.user.uid` aktif kullanıcı ID'sini, `req.query` sayfalama bilgilerini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getFeedPosts: async (req, res) => {
        try {
            const userId = req.user.uid;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            const posts = await PostService.getFeedPosts(userId, page, limit);
            if (!posts) {
                return res
                    .status(404)
                    .json({ error: "No posts found for this user" }); // Mesaj "Feed" ile ilgili olmalı
            }
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error getting feed posts:", error); // Log mesajı düzeltildi
            res.status(500).json({ error: "Error getting feed posts" }); // Hata mesajı düzeltildi
        }
    },
};

export default postController;
