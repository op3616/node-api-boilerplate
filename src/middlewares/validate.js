import Joi from 'joi';

import { HTTP_CODE } from '../config/constants';

import ApiError from '../utils/apiError';
import pick from '../utils/pick';

import { errorJoiMessages } from '../config/constants';

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: false },
    })
    .validate(object, { messages: errorJoiMessages });

  if (error) {
    const fieldError = error.details[0].context.key;

    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');

    return next(
      new ApiError(HTTP_CODE.BAD_REQUEST, `${fieldError} ${errorMessage}`)
    );
  }

  Object.assign(req, value);
  return next();
};

export default validate;
