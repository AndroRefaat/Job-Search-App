import joi from "joi";
import { isValidObjectId } from '../../middlewares/validation.middleware.js';

export const getChatSchema = joi.object({
    userId: joi.custom(isValidObjectId).required(),
}).required();