/**
 *  Takip işlemleriyle ilgili istekleri doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 */

import { requestValidator } from "./joiValidator.js";
import Joi from "joi";

/**
 * Takipçi Kullanıcı ID'si (`followerId`) için Joi doğrulama şeması.
 * UUID formatında olmalıdır.
 */
const followerUserIdSchema = Joi.object({
    followerId: Joi.string().uuid().required(),
});

/**
 * Takip Edilen Kullanıcı ID'si (`followingUserId`) için Joi doğrulama şeması.
 * UUID formatında olmalıdır.
 */
const followingUserIdSchema = Joi.object({
    followingUserId: Joi.string().uuid().required(),
});

/**
 * Takip etme/çıkarma gibi işlemler için gerekli olan takip eden ve takip edilen kullanıcı ID'lerini içeren Joi şeması.
 * Her iki ID de zorunlu ve UUID formatında olmalıdır. (Eğer farklı ID formatı kullanıyorsanız güncelleyin).
 * Not: Bu şema genellikle `req.params` yerine `req.body` veya tek bir ID (`req.params.userId`) için kullanılır. Koda göre `req.params` varsayıldı.
 */
const followsSchema = Joi.object({
    followerId: Joi.string().uuid().required(),
    followingId: Joi.string().uuid().required(),
});

/**
 * İstek parametrelerindeki (`req.params`) takip eden ve edilen ID'lerini doğrulamak için middleware.
 * Not: Genellikle takip/takibi bırakma endpoint'leri sadece `:userId` (takip edilecek/edilen) parametresi alır. Bu middleware'in kullanım amacı gözden geçirilmeli.
 */
export const validateFollow = requestValidator(followsSchema, "params");

/**
 * İstek parametrelerindeki (`req.params`) 'followerId' alanını doğrulamak için middleware.
 */
export const validateFollowerUserId = requestValidator(
    followerUserIdSchema,
    "params"
);

/**
 * İstek parametrelerindeki (`req.params`) 'followingUserId' alanını doğrulamak için middleware.
 */
export const validateFollowingUserId = requestValidator(
    followingUserIdSchema,
    "params"
);
