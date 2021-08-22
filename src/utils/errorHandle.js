import { HTTP_CODE } from '../config/constants';
import ApiError from './apiError';
import logger from '../config/logger';
import config from '../config';

// if you installed mongoose, please import dependency into file and remove next line
const mongoose = false;

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (mongoose && error instanceof mongoose.Error)
        ? HTTP_CODE.BAD_REQUEST
        : HTTP_CODE.INTERNAL_SERVER_ERROR;
    const message = error.message || HTTP_CODE[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
