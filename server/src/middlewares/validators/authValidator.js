import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Kullanıcı oluşturma semasi
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).max(20).required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
});

// Giriş semasi
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const validateRegister = requestValidator(registerSchema, "body");
export const validateLogin = requestValidator(loginSchema, "body");
