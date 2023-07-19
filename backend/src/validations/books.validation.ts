import { Joi, validate } from 'express-validation';

export const createBookValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().required(),
      authors: Joi.string(),
      tags: Joi.string(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getCommentsValidation = validate(
  {
    params: Joi.object({
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
