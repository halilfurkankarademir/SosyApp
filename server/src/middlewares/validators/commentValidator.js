/**
 * @fileoverview Yorum (Comment) işlemleriyle ilgili istekleri doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 * @module middlewares/validators/commentValidator
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

/**
 * @description Yorum oluşturma için istek gövdesini (`req.body`) doğrulayan Joi şeması.
 * `content` zorunlu bir metindir. `userId` UUID formatında (isteğe bağlı - genellikle req.user'dan alınır).
 */
const commentSchema = Joi.object({
    content: Joi.string().required(),
    userId: Joi.string().uuid(),
});

/**
 * @description Yorum ID'si (`commentId`) için Joi doğrulama şeması.
 * Zorunlu bir sayı olmalıdır. (Eğer ID'leriniz string ise Joi.string() kullanın).
 */
const commenIdSchema = Joi.object({
    commentId: Joi.number().integer().positive().required(),
});

/**
 * @description İstek gövdesindeki (`req.body`) yorum verilerini (`content`) doğrulamak için middleware.
 * @function validateComment
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateComment = requestValidator(commentSchema, "body");

/**
 * @description İstek parametrelerindeki (`req.params`) 'commentId' alanını doğrulamak için middleware.
 * @function validateCommentId
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateCommentId = requestValidator(commenIdSchema, "params"); // Şema adı 'commenIdSchema' olarak bırakıldı.
