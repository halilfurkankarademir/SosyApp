/**
 * @fileoverview Beğeni (Like) işlemleriyle ilgili HTTP isteklerini yöneten controller.
 * @module controllers/likeController
 */

import diContainer from "../config/dependencyInjection.js";
import postRepository from "../repositories/postRepository.js";
import { sendLikeNotification } from "../services/notificationService.js";
import { checkAdmin, getFilters, getPagination } from "../utils/helpers.js";
import logger from "../utils/logger.js";

const { likeService, postService } = diContainer;

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
    createLike: async (req, res, next) => {
        try {
            logger.info("Creating like...");

            //Kullanicinin begenecigi postun idsini aliyoruz
            const { postId } = req.params;
            // Kullanıcının kimliği JWT'den alınıyor
            const userId = req.user.uid;

            const like = await likeService.createLike(userId, postId);

            logger.info("Like created successfully");

            const post = await postRepository.findById(postId);

            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            sendLikeNotification(req.user, post.userId, postId);

            res.status(201).json(like);
        } catch (error) {
            logger.error("Error creating like:", error);
            res.status(500).json({
                error: "Like oluşturulurken bir hata oluştu.",
            });
            next(error);
        }
    },
    /**
     * @description Bir gönderideki beğeniyi kaldırır.
     * @route DELETE /like/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` ve `req.user.uid` içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    deleteLike: async (req, res, next) => {
        try {
            logger.info("Deleting like...");
            const { postId } = req.params;
            const userId = req.user.uid; // Kullanıcının kimliği JWT'den alınıyor
            await likeService.deleteLike(userId, postId);
            logger.info("Like deleted successfully");
            res.status(200).json({ message: "Begeni iptal edildi." });
        } catch (error) {
            logger.error("Error deleting like:", error);
            res.status(500).json({
                error: "Begeni iptal edilirken bir hata oluştu.",
            });
            next(error);
        }
    },

    /**
     * @description Belirli bir gönderiye ait tüm beğenileri listeler.
     * @route GET /like/post/:postId
     * @param {object} req - Express istek nesnesi. `req.params.postId` gönderi ID'sini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getAllLikes: async (req, res, next) => {
        try {
            const isAdmin = checkAdmin(req);

            if (!isAdmin) {
                return res.status(403).json({ error: "Access denied" });
            }

            logger.info("Getting likes...");

            const postId = req.params.postId;

            const likes = await likeService.getAllLikes(postId);

            logger.info("Likes fetched successfully");

            res.status(200).json(likes);
        } catch (error) {
            logger.error("Error getting likes:", error);
            res.status(500).json({
                error: "Begenileri alırken bir hata oluştu.",
            });
            next(error);
        }
    },

    /**
     * @description Aktif kullanıcının beğendiği gönderileri listeler (sayfalama ile).
     * @route GET /like/user?page={pageNumber}&limit={pageSize}
     * @param {object} req - Express istek nesnesi. `req.user.uid` kullanıcı ID'sini, `req.query` sayfalama bilgilerini içerir.
     * @param {object} res - Express yanıt nesnesi.
     */
    getLikesByUserId: async (req, res, next) => {
        try {
            logger.info("Getting likes by user ID...");
            const userId = req.user.uid;
            const { limit, offset } = getPagination(req);
            const { filterQuery } = getFilters(req);
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // PostService'in bu fonksiyonu çağırdığı varsayılıyor.
            const likes = await postService.getLikedPostsByUserId(
                userId,
                offset,
                limit,
                filterQuery
            );
            logger.info("Likes fetched successfully");
            res.status(200).json(likes);
        } catch (error) {
            logger.error("Error getting likes by user ID:", error);
            res.status(500).json({
                error: "Kullanıcının begenilerini alırken bir hata oluştu.",
            });
            next(error);
        }
    },
};
export default likeController;
