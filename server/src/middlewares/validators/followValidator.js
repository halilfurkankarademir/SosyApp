import { requestValidator } from "./joiValidator.js";
import Joi from "joi";

const followsSchema = Joi.object({
    followingUserId: Joi.string().uuid(),
    followerId: Joi.string().uuid(),
    userId: Joi.string().uuid(),
});

export const validateFollow = requestValidator(followsSchema, "params");
