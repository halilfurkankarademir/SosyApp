/**
 * @fileoverview Kimlik doğrulama (kayıt ve giriş) işlemleri için Joi şemaları ve doğrulama middleware'lerini tanımlar.
 * @module middlewares/validators/authValidator
 */

import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

/**
 * @description Yeni kullanıcı kaydı (`/auth/register`) için istek gövdesini (`req.body`) doğrulayan Joi şeması.
 * email, password, username, firstName, lastName alanlarını ve kurallarını içerir.
 */
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // Şifre için daha karmaşık kurallar eklenebilir (pattern vb.)
    username: Joi.string().alphanum().min(3).max(20).required(), // Alfanümerik varsayımı
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
});

/**
 * @description Kullanıcı girişi (`/auth/login`) için istek gövdesini (`req.body`) doğrulayan Joi şeması.
 * email ve password alanlarını içerir.
 */
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(), // Girişte min uzunluk kontrolü genellikle gereksizdir.
});

/**
 * @description Kullanıcı kayıt isteğinin gövdesini (`req.body`) doğrulamak için middleware.
 * @function validateRegister
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateRegister = requestValidator(registerSchema, "body");

/**
 * @description Kullanıcı giriş isteğinin gövdesini (`req.body`) doğrulamak için middleware.
 * @function validateLogin
 * @type {Function} Express middleware fonksiyonu.
 */
export const validateLogin = requestValidator(loginSchema, "body");
