import { Joi, validate } from 'express-validation';

export const createStorageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      group_id: Joi.number().required(),
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

export const findStoragesFromGroupValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    }),
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
