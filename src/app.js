import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { errorConverter, errorHandler } from './utils/errorHandle';
import ApiError from './utils/apiError';
import authLimiter from './utils/rateLimiter';

import { HTTP_CODE } from './config/constants';
import config from './config';
import morgan from './config/morgan';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// hide framework name
app.disable('X-Powered-By');

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// route demo
app.get('/', (req, res) => {
  res.send('hello world');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(HTTP_CODE.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
