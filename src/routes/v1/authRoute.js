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
  '/refresh-tokens',
  validate(authValidation.refreshToken),
  authController.refreshToken
);

router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  '/send-verification-email',
  auth(),
  authController.sendVerificationEmail
);

router.post(
  '/verify-email',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

export default router;
