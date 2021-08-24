import Joi from 'joi';

import { password } from './customValidation';

export const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().default('user'),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
