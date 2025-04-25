import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Begeni semasi
const likeSchema = Joi.object({
    postId: Joi.number().required(),
});

export const validateLike = requestValidator(likeSchema, "params");
