import { Joi, validate } from 'express-validation';

export const createSeriaValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512),
      author: Joi.string().max(512),
      release_date: Joi.date().allow(null),
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
      release_date: Joi.date().allow(null),
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
      query: Joi.string().max(256).allow(''),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getSeriesListValidation = validate(
  {
    query: Joi.object({
      query: Joi.string().max(256).allow(''),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
