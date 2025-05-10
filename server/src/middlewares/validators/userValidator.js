/**
 * Kullanıcı ile ilgili (username, email, userId) istek parametrelerini doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js"; // requestValidator'ın import edildiğini varsayıyoruz

/**
 * Kullanıcı adı (`username`) için Joi doğrulama şeması.
 * Alfanümerik, min 3, max 20 karakter uzunluğunda ve zorunlu olmalıdır.
 */
const usernameSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
});

/**
 * E-posta adresi (`email`) için Joi doğrulama şeması.
 * Geçerli bir e-posta formatında ve zorunlu olmalıdır.
 */
const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

/**
 * Kullanıcı ID'si (`userId`) için Joi doğrulama şeması.
 * Geçerli bir UUID formatında ve zorunlu olmalıdır.
 * (Eğer farklı bir ID formatı kullanıyorsanız şemayı güncelleyin).
 */
const userIdSchema = Joi.object({
    userId: Joi.string().uuid().required(),
});

/**
 *  İstek parametrelerindeki (`req.params`) 'username' alanını doğrulamak için middleware.
 */
export const validateUsername = requestValidator(usernameSchema, "params");

/**
 * İstek parametrelerindeki (`req.params`) 'email' alanını doğrulamak için middleware.
 */
export const validateEmail = requestValidator(emailSchema, "params");

/**
 * İstek parametrelerindeki (`req.params`) 'userId' alanını doğrulamak için middleware.
 */
export const validateUserId = requestValidator(userIdSchema, "params");
