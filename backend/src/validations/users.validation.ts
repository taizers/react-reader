import { Joi, validate } from 'express-validation';

export const createUserValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(256).required(),
      password: Joi.string().max(256).required(),
      email: Joi.string().email().max(256).required(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const updateUserValidation = validate(
  {
    body: Joi.object({
      name: Joi.string().max(256),
      oldPassword: Joi.string().max(256),
      newPassword: Joi.string().max(256),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const getUserValidation = validate(
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

export const getUsersValidation = validate(
  {
    query: Joi.object({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  },
  {
    context: true,
  },
  {
    stripUnknown: true,
  }
);

export const deleteUserValidation = validate(
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
