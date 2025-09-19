import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const customerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,20}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a valid number",
    }),
  email: Joi.string().email().required(),
});