import { Joi, validate } from 'express-validation';

export const deleteBookStorageValidation = validate(
  {
    body: Joi.object({
      ids: Joi.array().items(Joi.string()),
    })
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
