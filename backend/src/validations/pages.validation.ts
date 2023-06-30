import { Joi, validate } from 'express-validation';

export const createPageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      content: Joi.string().required(),
      mainpage_id: Joi.number().allow(null),
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

export const updatePageValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      content: Joi.string().required(),
      mainpage_id: Joi.number().allow(null),
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
