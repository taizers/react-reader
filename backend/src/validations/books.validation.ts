import { Joi, validate } from 'express-validation';

export const createBookValidation = validate(
  {
    body: Joi.object({
      author: Joi.string().max(512),
      tags: Joi.string().max(512),
      categories: Joi.string().max(512),
      releaseDate: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
      link: Joi.string().max(512),
      downloads: Joi.string().max(512),
      source: Joi.string().max(512),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateBookValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512),
      author: Joi.string().max(512),
      tags: Joi.string().max(512),
      categories: Joi.string().max(512),
      releaseDate: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
      link: Joi.string().max(512),
      downloads: Joi.string().max(512),
      source: Joi.string().max(512),
      primory_link: Joi.string().max(512),
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

export const getPaginatedBooksValidation = validate(
  {
    query: Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
      query: Joi.string(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
