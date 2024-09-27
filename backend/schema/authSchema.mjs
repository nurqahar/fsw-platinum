import Joi from "joi";
import { password } from "./commonSchema.mjs";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateResetPasswordSchema = Joi.object({
  token: Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+\=]*$/
  ),
  confirmPassword: password
    .equal(Joi.ref("password"))
    .messages({ "any.only": "{{#label}} does not match" }),
  password,
});

export default loginSchema;
