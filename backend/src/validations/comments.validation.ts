import { Joi, validate } from 'express-validation';

export const createCommentValidation = validate(
  {
    body: Joi.object({
      content: Joi.string().required().max(1024),
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
