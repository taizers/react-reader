import { Joi, validate } from 'express-validation';

export const createUserValidation = validate(
  {
    body: Joi.object({
      username: Joi.string().max(256),
      group_id: Joi.number().allow(null),
      role: Joi.string().max(256).required(),
      post: Joi.string().max(256).allow(null),
      activationkey: Joi.string().max(256).allow(null),
      phone: Joi.string().max(256).allow(null),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateUserValidation = validate(
  {
    body: Joi.object({
      username: Joi.string().max(256),
      group_id: Joi.number().allow(null),
      activationkey: Joi.string().max(256).allow(null),
      role: Joi.string().max(256),
      post: Joi.string().max(256).allow(null),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getUsersValidation = validate(
  {
    query: Joi.object({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
