import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Gonderi kayit semasi
const savedSchema = Joi.object({
    postId: Joi.number().required(),
});

export const validateSaved = requestValidator(savedSchema, "params");
