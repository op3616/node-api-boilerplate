import express from 'express';

// middlewares
import validate from '../../middlewares/validate';

import * as authValidate from '../../validations/authValidation';
import * as authController from '../../controllers/authController';

import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validate(authValidate.register),
  authController.register
);

router.post('/login', validate(authValidate.login), authController.login);

router.post(
  '/refresh-token',
  auth(),
  validate(authValidate.refreshToken),
  authController.refreshToken
);

export default router;
