import { Joi, validate } from 'express-validation';

export const createNewsValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(32).required(),
      content: Joi.string().required(),
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

export const updateNewsValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(32).required(),
      content: Joi.string().required(),
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

export const getAllNewsValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
