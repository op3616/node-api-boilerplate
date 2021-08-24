import express from 'express';

// middlewares
import validate from '../../middlewares/validate';

import * as authValidation from '../../validations/authValidation';
import * as authController from '../../controllers/authController';

import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

router.post('/login', validate(authValidation.login), authController.login);

router.post('/logout', validate(authValidation.logout), authController.logout);

router.post(
  '/refresh-token',
  auth(),
  validate(authValidation.refreshToken),
  authController.refreshToken
);

export default router;
