import { Joi, validate } from 'express-validation';
import { colorTemplate } from '../helpers/regex';

export const createGaleryValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      created_at: Joi.date(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateGaleryValidation = validate(
  {
    body: Joi.object({
      title: Joi.string().max(256).required(),
      cover: Joi.number().allow(null),
      deleted: Joi.string().max(256).allow(''),
      created_at: Joi.date(),
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
