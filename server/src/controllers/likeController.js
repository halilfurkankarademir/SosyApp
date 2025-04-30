/**
 * @fileoverview Beğeni (Like) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/likeController
 */

// begeni islemleri icin controllerlar
import postRepository from "../repositories/postRepository.js"; // Kullanılıyor
import likeService from "../services/likeService.js";
import { sendLikeNotification } from "../services/notificationService.js"; // Kullanılıyor
import PostService from "../services/postService.js"; // Kullanılıyor

/**
 * @description Beğeni işlemleri (oluşturma, silme, listeleme, kontrol) için controller fonksiyonlarını içerir.
 */
const likeController = {
    /**
     * @description Bir gönderiye beğeni ekler ve bildirim gönderir.
     * @route POST /like/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    createLike: async (req, res) => {
        try {
            //Kullanicinin begenecigi postun idsini aliyoruz
            const { postId } = req.params;
            // Kullanıcının kimliği JWT'den alınıyor
            const userId = req.user.uid;

            const like = await likeService.createLike(userId, postId);

            console.log("Like created:", like);

            const post = await postRepository.findById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            sendLikeNotification(req.user, post.userId, postId);

            res.status(201).json(like);
        } catch (error) {
            console.error("Error creating like:", error);
            res.status(500).json({
                error: "Like oluşturulurken bir hata oluştu.",
            });
        }
    },
    /**
     * @description Bir gönderideki beğeniyi kaldırır.
     * @route DELETE /like/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deleteLike: async (req, res) => {
        try {
            const { postId } = req.params;
            const userId = req.user.uid; // Kullanıcının kimliği JWT'den alınıyor
            await likeService.deleteLike(userId, postId);
            res.status(200).json({ message: "Begeni iptal edildi." });
        } catch (error) {
            console.error("Error deleting like:", error);
            res.status(500).json({
                error: "Begeni iptal edilirken bir hata oluştu.",
            });
        }
    },

    /**
     * @description Belirli bir gönderiye ait tüm beğenileri listeler.
     * @route GET /like/post/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` gönderi ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getAllLikes: async (req, res) => {
        try {
            const postId = req.params.postId;
            const likes = await likeService.getLikesForPost(postId);
            res.status(200).json(likes);
        } catch (error) {
            console.error("Error getting likes:", error);
            res.status(500).json({
                error: "Begenileri alırken bir hata oluştu.",
            });
        }
    },

    /**
     * @description Aktif kullanıcının beğendiği gönderileri listeler (sayfalama ile).
     * @route GET /like/user?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.user.uid` kullanıcı ID'sini, `req.query` sayfalama bilgilerini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getLikesByUserId: async (req, res) => {
        try {
            const userId = req.user.uid;
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // PostService'in bu fonksiyonu çağırdığı varsayılıyor.
            const likes = await PostService.getLikedPostsByUserId(
                userId,
                page,
                limit
            );
            res.status(200).json(likes);
        } catch (error) {
            console.error("Error getting likes by user ID:", error);
            res.status(500).json({
                error: "Kullanıcının begenilerini alırken bir hata oluştu.",
            });
        }
    },

    /**
     * @description Aktif kullanıcının belirli bir gönderiyi beğenip beğenmediğini kontrol eder.
     * @route GET /like/check/:postId (Varsayılan route, kontrol edilmeli)
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    checkLike: async (req, res) => {
        try {
            const { postId } = req.params;
            const userId = req.user.uid;
            const isLiked = await likeService.hasUserLikedPost(userId, postId);
            res.status(200).json({ isLiked });
        } catch (error) {
            console.error("Error checking like:", error);
            res.status(500).json({
                error: "Begeni kontrol edilirken bir hata oluştu.",
            });
        }
    },
};
export default likeController;
