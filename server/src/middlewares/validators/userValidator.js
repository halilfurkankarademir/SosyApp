/**
 * @fileoverview Kullanıcı ile ilgili (username, email, userId) istek parametrelerini doğrulamak için Joi şemaları ve middleware'leri tanımlar.
 * @module middlewares/validators/userValidator
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js"; // requestValidator'ın import edildiğini varsayıyoruz

/**
 * @description Kullanıcı adı (`username`) için Joi doğrulama şeması.
 * Alfanümerik, min 3, max 20 karakter uzunluğunda ve zorunlu olmalıdır.
 */
const usernameSchema = Joi.object({
    // username: Joi.string().min(3).max(20).required(), // Alfanümerik kontrolü olmadan
    username: Joi.string().alphanum().min(3).max(20).required(),
});

/**
 * @description E-posta adresi (`email`) için Joi doğrulama şeması.
 * Geçerli bir e-posta formatında ve zorunlu olmalıdır.
 */
const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

/**
 * @description Kullanıcı ID'si (`userId`) için Joi doğrulama şeması.
 * Geçerli bir UUID formatında ve zorunlu olmalıdır.
 * (Eğer farklı bir ID formatı kullanıyorsanız şemayı güncelleyin).
 */
const userIdSchema = Joi.object({
    // userId: Joi.string().required() // Eğer basit string ID ise
    // userId: Joi.number().integer().positive().required() // Eğer sayısal ID ise
    userId: Joi.string().uuid().required(),
});

/**
 * @description İstek parametrelerindeki (`req.params`) 'username' alanını doğrulamak için middleware.
 * @function validateUsername
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateUsername = requestValidator(usernameSchema, "params");

/**
 * @description İstek parametrelerindeki (`req.params`) 'email' alanını doğrulamak için middleware.
 * @function validateEmail
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateEmail = requestValidator(emailSchema, "params");

/**
 * @description İstek parametrelerindeki (`req.params`) 'userId' alanını doğrulamak için middleware.
 * @function validateUserId
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateUserId = requestValidator(userIdSchema, "params");
