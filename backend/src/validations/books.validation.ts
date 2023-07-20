import { Joi, validate } from 'express-validation';

export const createBookValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(512).required(),
      author: Joi.string().max(512),
      tags: Joi.string().max(512),
      releaseDate: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
      jenre: Joi.string().max(512),
      source: Joi.string().max(512),
      text: Joi.string().required(),
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
      releaseDate: Joi.date(),
      cover: Joi.string(),
      annotation: Joi.string().max(1024),
      jenre: Joi.string().max(512),
      source: Joi.string().max(512),
      text: Joi.string(),
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

export const getBookValidation = validate(
  {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const deleteBookValidation = validate(
  {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);
