import joi from "joi";
import { isValidObjectId } from "../../middlewares/validation.middleware.js";

export const banOrUnbanUserSchema = joi.object({
    userId: joi.custom(isValidObjectId).required(),
}).required();


export const banOrUnbanCompanySchema = joi.object({
    companyId: joi.custom(isValidObjectId).required(),
}).required();

export const approveSchema = joi.object({
    companyId: joi.custom(isValidObjectId).required(),
}).required();
