import { Joi, validate } from 'express-validation';

export const createLibraryBookValidation = validate(
  {
    body: Joi.object({
      state: Joi.string().max(256).allow(null),
      last_page: Joi.string().max(256).allow(null),
      last_open: Joi.date().allow(null),
      progress: Joi.number().min(0).max(100).allow(null),
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
      ids: Joi.object({
        user_id: Joi.number().required(),
        book_id: Joi.number().required(),
      }),
      payload: Joi.object({
        state: Joi.string().max(256).allow(null),
        last_page: Joi.number().allow(null),
        last_open: Joi.date().allow(null),
        progress: Joi.number().min(0).max(100).allow(null),
      }),
    })
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
      query: Joi.string().allow(''),
      state: Joi.string().allow(null).allow(''),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
