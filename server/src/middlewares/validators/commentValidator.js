import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Yorum semasi
const commentSchema = Joi.object({
    content: Joi.string().required(),
    userId: Joi.string().uuid(),
});

const commenIdSchema = Joi.object({
    commentId: Joi.number().required(),
});

export const validateComment = requestValidator(commentSchema, "body");
export const validateCommentId = requestValidator(commenIdSchema, "params");
