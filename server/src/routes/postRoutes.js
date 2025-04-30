/**
 * @fileoverview Gonderi (Post) islemleri icin route'lari tanimlar.
 * @module routes/postRoutes
 */

import express from "express";
import postController from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    validatePost,
    validatePostId,
} from "../middlewares/validators/postValidator.js";
import { validateUserId } from "../middlewares/validators/userValidator.js";

const router = express.Router();

/**
 * Tüm gönderileri getirir (sayfalama olabilir).
 * @route {GET} /posts/
 * @description Tüm gönderileri listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile gönderi dizisi, hata durumunda (401, 500).
 */
router.get("/", authenticateToken, postController.findPosts);

/**
 * Aktif kullanıcının takip ettiği kişilerin gönderilerini (feed) getirir.
 * @route {GET} /posts/feed
 * @description Kullanıcının ana akışını (takip edilenlerin gönderileri) listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile gönderi dizisi, hata durumunda (401, 500).
 */
router.get("/feed", authenticateToken, postController.getFeedPosts);

/**
 * Belirli bir gönderiyi ID ile getirir.
 * @route {GET} /posts/:postId
 * @description ID'si verilen gönderinin detaylarını getirir. `postId` doğrulaması gerektirir. (Kimlik doğrulama isteğe bağlı olabilir)
 * @param {string} req.params.postId - Getirilecek gönderinin ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile gönderi objesi, hata durumunda (400, 404, 500).
 */
router.get("/:postId", validatePostId, postController.getPostById);

/**
 * Belirli bir kullanıcının gönderilerini getirir.
 * @route {GET} /posts/user/:userId
 * @description ID'si verilen kullanıcının gönderilerini listeler. Kimlik doğrulama ve `userId` doğrulaması gerektirir.
 * @param {string} req.params.userId - Gönderileri listelenecek kullanıcının ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile gönderi dizisi, hata durumunda (400, 401, 404, 500).
 */
// Eğer userId için ayrı validator varsa eklenmeli: validateUserId
router.get(
    "/user/:userId",
    validateUserId,
    authenticateToken,
    postController.getPostsByUserId
);

/**
 * Yeni gönderi oluşturur.
 * @route {POST} /posts/
 * @description Yeni bir gönderi oluşturur. Kimlik doğrulama ve gönderi verisi (`validatePost`) doğrulaması gerektirir.
 * @param {object} req.body - Gönderi içeriği, örn: `{ content: "...", imageUrl: "..." }`.
 * @returns {void} Başarılı olursa `201 Created` ile gönderi objesi, hata durumunda (400, 401, 500).
 */
router.post("/", validatePost, authenticateToken, postController.createPost);

/**
 * Belirli bir gönderiyi siler.
 * @route {DELETE} /posts/:postId
 * @description Gönderiyi siler. Kimlik doğrulama ve `postId` doğrulaması gerektirir. Kullanıcı yetkisi kontrol edilir.
 * @param {string} req.params.postId - Silinecek gönderinin ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda (400, 401, 403, 404, 500).
 */
router.delete(
    "/:postId",
    validatePostId,
    authenticateToken,
    postController.deletePost
);

export default router;
