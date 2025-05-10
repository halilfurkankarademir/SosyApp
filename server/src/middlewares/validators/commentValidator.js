/**
 *  Yorum (Comment) işlemleriyle ilgili istekleri doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

/**
 * Yorum oluşturma için istek gövdesini (`req.body`) doğrulayan Joi şeması.
 * `content` zorunlu bir metindir. `userId` UUID formatında (isteğe bağlı - genellikle req.user'dan alınır).
 */
const commentSchema = Joi.object({
    content: Joi.string().required(),
    userId: Joi.string().uuid(),
});

/**
 * Yorum ID'si (`commentId`) için Joi doğrulama şeması.
 * Zorunlu bir sayı olmalıdır. (Eğer ID'leriniz string ise Joi.string() kullanın).
 */
const commenIdSchema = Joi.object({
    commentId: Joi.number().integer().positive().required(),
});

/**
 *  İstek gövdesindeki (`req.body`) yorum verilerini (`content`) doğrulamak için middleware.
 */
export const validateComment = requestValidator(commentSchema, "body");

/**
 *  İstek parametrelerindeki (`req.params`) 'commentId' alanını doğrulamak için middleware.
 */
export const validateCommentId = requestValidator(commenIdSchema, "params");
