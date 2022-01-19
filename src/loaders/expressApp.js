import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';

import routes from '../routes/v1';

import { errorConverter, errorHandler } from '../middlewares/errors';
import authLimiter from '../middlewares/rateLimiter';
import ApiError from '../utils/apiError';

import { HTTP_CODE } from '../config/constants';
import { jwtStrategy } from '../config/passport';
import config from '../config/secretKeys';
import morgan from '../config/morgan';

const expressAppLoader = ({ app }) => {
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

  // jwt authentication
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  // limit repeated failed requests to auth endpoints
  if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
  }

  // route demo
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  // v1 api routes
  app.use('/v1', routes);

  // send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(HTTP_CODE.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  return app;
};

export default expressAppLoader;
