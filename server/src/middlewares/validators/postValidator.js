import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Gonderi olusturma semasi
const postSchema = Joi.object({
    content: Joi.string().allow(null, ""),
    media: Joi.string().allow(null, ""),
});

// Gonderi id semasi
const postIdSchema = Joi.object({
    postId: Joi.number().required(),
});

export const validatePost = requestValidator(postSchema, "body");
export const validatePostId = requestValidator(postIdSchema, "params");
