/**
 * @fileoverview Yorum islemleri icin route'lari tanimlar.
 * @module routes/commentRoutes
 */

import commentController from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    validateComment,
    validateCommentId,
} from "../middlewares/validators/commentValidator.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Belirli bir gönderiye yorum oluşturur.
 * @route {POST} /comments/:postId
 * @description Yeni yorum ekler. Kimlik doğrulama, postId ve yorum verisi doğrulaması gerektirir.
 * @param {string} req.params.postId - Yorum yapılacak gönderinin ID'si.
 * @param {object} req.body - Yorum içeriği, örn: `{ content: "..." }`.
 * @returns {void} Başarılı olursa `201 Created` ile yorum objesi, hata durumunda ilgili status kodları (400, 401, 404, 500).
 */
router.post(
    "/:postId",
    validatePostId,
    validateComment,
    authenticateToken,
    commentController.createComment
);

/**
 * Belirli bir yorumu siler.
 * @route {DELETE} /comments/:commentId
 * @description Yorumu siler. Kimlik doğrulama ve commentId doğrulaması gerektirir. Kullanıcı yetkisi kontrol edilir.
 * @param {string} req.params.commentId - Silinecek yorumun ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda ilgili status kodları (400, 401, 403, 404, 500).
 */
router.delete(
    "/:commentId",
    validateCommentId,
    authenticateToken,
    commentController.deleteComment
);

/**
 * Bir gönderiye ait tüm yorumları getirir.
 * @route {GET} /comments/:postId
 * @description Gönderinin yorumlarını listeler. Kimlik doğrulama ve postId doğrulaması gerektirir.
 * @param {string} req.params.postId - Yorumları listelenecek gönderinin ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile yorum dizisi, hata durumunda ilgili status kodları (400, 401, 404, 500).
 */
router.get(
    "/:postId",
    validatePostId,
    authenticateToken,
    commentController.getCommentsByPostId
);

export default router;
