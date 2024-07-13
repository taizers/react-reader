import { Joi, validate } from 'express-validation';

export const createSeriaValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512).required(),
      author: Joi.string().max(512),
      tags: Joi.string().max(512),
      categories: Joi.string().max(512),
      release_date: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateSeriaValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512),
      author: Joi.string().max(512),
      tags: Joi.string().max(512),
      categories: Joi.string().max(512),
      release_date: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
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

export const getPaginatedSeriesValidation = validate(
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
