import { Joi, validate } from 'express-validation';

export const createStorageGroupValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      created_at: Joi.date(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateStorageGroupValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      created_at: Joi.date(),
    }),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
