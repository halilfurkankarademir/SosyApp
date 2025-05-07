/**
 * @fileoverview Begeni islemleri icin route'leri tanimlar.
 * @module routes/likeRoutes
 */

import express from "express";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import likeController from "../controllers/likeController.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Bir gönderinin tüm beğenilerini getirir.
 * @route {GET} /like/post/:postId
 * @description Gönderinin beğenilerini listeler. Kimlik doğrulama ve `postId` doğrulaması gerektirir.
 * @param {string} req.params.postId - Beğenileri alınacak gönderinin ID'si.
 * @returns {void} Başarılı olursa `200 OK` ile beğeni dizisi, hata durumunda ilgili status kodları (400, 401, 404, 500).
 */
router.get(
    "/post/:postId",
    authenticateToken,
    validatePostId,
    likeController.getAllLikes
);

/**
 * Aktif kullanıcının beğendiği gönderileri getirir.
 * @route {GET} /like/user
 * @description Oturum açmış kullanıcının beğendiği gönderileri listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile gönderi dizisi, hata durumunda ilgili status kodları (401, 500).
 */
router.get("/me", authenticateToken, likeController.getLikesByUserId);

/**
 * Bir gönderiyi beğenir.
 * @route {POST} /like/:postId
 * @description Gönderiyi beğenme işlemini gerçekleştirir. Kimlik doğrulama ve `postId` doğrulaması (`validateLike`/`validatePostId`) gerektirir.
 * @param {string} req.params.postId - Beğenilecek gönderinin ID'si.
 * @returns {void} Başarılı olursa `201 Created` ile beğeni objesi, hata durumunda ilgili status kodları (400, 401, 404, 409, 500).
 */
router.post(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    likeController.createLike
);

/**
 * Bir gönderideki beğeniyi kaldırır.
 * @route {DELETE} /like/:postId
 * @description Gönderideki beğeniyi siler. Kimlik doğrulama ve `postId` doğrulaması gerektirir.
 * @param {string} req.params.postId - Beğenisi kaldırılacak gönderinin ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda ilgili status kodları (400, 401, 404, 500).
 */
router.delete(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    likeController.deleteLike
);

export default router;
