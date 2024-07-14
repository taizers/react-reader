import { Joi, validate } from 'express-validation';

export const createTagValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512).required(),
    })
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
