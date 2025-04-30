/**
 * @fileoverview Kaydedilen gönderi işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/savedController
 */

import PostService from "../services/postService.js"; // Bu import kullanılıyor olarak varsayıldı
import savedService from "../services/savedService.js";

/**
 * @description Kaydedilen gönderi işlemleri (kaydetme, kaldırma, listeleme, kontrol etme) için controller fonksiyonlarını içerir.
 */
const savedController = {
    /**
     * @description Bir gönderiyi aktif kullanıcının kaydedilenlerine ekler.
     * @route POST /saved/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    savePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            const saved = await savedService.savePost(userId, postId);
            res.status(201).json(saved);
        } catch (error) {
            // Hata durumunda 500 Internal Server Error döner.
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Bir gönderiyi aktif kullanıcının kaydedilenlerinden çıkarır.
     * @route DELETE /saved/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    unsavePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            await savedService.unsavePost(userId, postId);
            res.status(200).json({ message: "Post un-saved successfully" });
        } catch (error) {
            // Hata durumunda 500 Internal Server Error döner.
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Aktif kullanıcının kaydettiği gönderileri listeler (sayfalama ile).
     * @route GET /saved/?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.user.uid` içerir, `req.query`'den page ve limit alınabilir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getSavedPosts: async (req, res) => {
        try {
            const userId = req.user.uid;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            // PostService'in bu fonksiyonu çağırdığı varsayılıyor.
            const savedPosts = await PostService.getSavedPostsByUserId(
                userId,
                page,
                limit
            );
            res.status(200).json(savedPosts);
        } catch (error) {
            // Hata durumunda 500 Internal Server Error döner.
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * @description Aktif kullanıcının belirli bir gönderiyi kaydedip kaydetmediğini kontrol eder.
     * @route GET /saved/check/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    checkPostSaved: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.uid;
            const isSaved = await savedService.isPostSaved(userId, postId);
            res.status(200).json(isSaved); // { isSaved: true/false } dönmeli
        } catch (error) {
            // Hata durumunda 500 Internal Server Error döner.
            res.status(500).json({ error: error.message });
        }
    },
};

export default savedController;
