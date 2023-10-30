import { Joi, validate } from 'express-validation';

export const createLibraryValidation = validate(
  {
    body: Joi.object({
      state: Joi.string().max(512).required(),
      user_id: Joi.number().required(),
      book_id: Joi.number().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateLibraryValidation = validate(
  {
    body: Joi.object({
      state: Joi.string().max(512).required(),
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

export const getPaginatedLibraryValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      query: Joi.string().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
