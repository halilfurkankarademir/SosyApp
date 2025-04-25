import Joi from "joi";
import { requestValidator } from "./joiValidator.js";

// Arama semasi
const searchSchema = Joi.object({
    query: Joi.string().required(),
});

export const validateSearch = requestValidator(searchSchema, "query");
