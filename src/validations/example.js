import Joi from 'joi';

export const validateExample = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
  }),
};
