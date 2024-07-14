import { Joi, validate } from 'express-validation';

export const paramsIdValidation = validate(
  {
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

export const getByQueryValidation = validate(
  {
    query: Joi.object({
      query: Joi.string().max(256).required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
