/**
 * @fileoverview Kaydedilen gönderi işlemleri için route'ları tanımlar.
 * @module routes/savedRoutes
 */

import savedController from "../controllers/savedController.js";
import express from "express";
import {
    authenticateToken,
    verifyCSRF,
} from "../middlewares/authMiddleware.js";
import { validatePostId } from "../middlewares/validators/postValidator.js";

const router = express.Router();

/**
 * Aktif kullanıcının kaydettiği gönderileri getirir.
 * @route {GET} /saved/
 * @description Oturum açmış kullanıcının kaydettiği gönderileri listeler. Kimlik doğrulama gerektirir.
 * @returns {void} Başarılı olursa `200 OK` ile kaydedilen gönderi(ler)/ilişki dizisi, hata durumunda (401, 500).
 */
router.get("/", authenticateToken, savedController.getSavedPosts);

/**
 * Bir gönderiyi kaydeder.
 * @route {POST} /saved/:postId
 * @description Belirtilen gönderiyi aktif kullanıcının kaydedilenlerine ekler. Kimlik doğrulama ve `postId` gerektirir.
 * @param {string} req.params.postId - Kaydedilecek gönderinin ID'si.
 * @returns {void} Başarılı olursa `201 Created` ile kaydedilme bilgisi, hata durumunda (400, 401, 404, 409, 500).
 */
router.post(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    savedController.savePost
);

/**
 * Bir gönderiyi kaydedilenlerden çıkarır.
 * @route {DELETE} /saved/:postId
 * @description Belirtilen gönderiyi aktif kullanıcının kaydedilenlerinden çıkarır. Kimlik doğrulama ve `postId` doğrulaması gerektirir.
 * @param {string} req.params.postId - Kaydedilenlerden çıkarılacak gönderinin ID'si.
 * @returns {void} Başarılı olursa `204 No Content`, hata durumunda (400, 401, 404, 500).
 */
router.delete(
    "/:postId",
    authenticateToken,
    verifyCSRF,
    validatePostId,
    savedController.unsavePost
);

export default router;
