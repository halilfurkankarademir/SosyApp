import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Kullanici adi semasi
const usernameSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const validateUsername = requestValidator(usernameSchema, "params");
export const validateEmail = requestValidator(emailSchema, "params");
