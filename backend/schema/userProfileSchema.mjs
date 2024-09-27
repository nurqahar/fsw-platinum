import Joi from "joi";
export const userProfileSchema = Joi.object({
  bio: Joi.string().min(1).required(),
});
export const editUserProfileSchema = Joi.object({
  bio: Joi.string().min(1),
});
