/**
 * Gönderi (Post) ile ilgili istekleri doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

/**
 * Gönderi oluşturma/güncelleme için istek gövdesini (`req.body`) doğrulayan Joi şeması.
 * `content` ve `media` alanları metin olabilir veya boş/null olabilir.
 */
const postSchema = Joi.object({
    content: Joi.string().allow(null, ""), // İçerik boş veya null olabilir
    media: Joi.string().uri().allow(null, ""), // Medya bir URI olmalı, boş veya null olabilir (isteğe bağlı)
    // Eğer ikisinden birinin zorunlu olması gerekiyorsa .or('content', 'media') eklenebilir.
});

/**
 * Gönderi ID'si (`postId`) için Joi doğrulama şeması.
 * Zorunlu bir sayı olmalıdır. (Eğer ID'leriniz string ise Joi.string() kullanın).
 */
const postIdSchema = Joi.object({
    // postId: Joi.string().uuid().required(), // Eğer UUID kullanıyorsanız
    // postId: Joi.string().required(), // Eğer string ID kullanıyorsanız
    postId: Joi.number().integer().positive().required(), // Pozitif tamsayı ID varsayımı
});

/**
 * İstek gövdesindeki (`req.body`) gönderi verilerini (`content`, `media`) doğrulamak için middleware.
 */
export const validatePost = requestValidator(postSchema, "body");

/**
 * İstek parametrelerindeki (`req.params`) 'postId' alanını doğrulamak için middleware.
 */
export const validatePostId = requestValidator(postIdSchema, "params");
