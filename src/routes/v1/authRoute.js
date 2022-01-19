import express from 'express';
import validate from '../../middlewares/validate';
import auth from '../../middlewares/auth';
import * as authValidation from '../../validations/authValidation';
import * as authController from '../../controllers/authController';
import wrapAsync from '../../utils/wrapAsync';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  wrapAsync(authController.register)
);

router.post(
  '/login',
  validate(authValidation.login),
  wrapAsync(authController.login)
);

router.post(
  '/logout',
  validate(authValidation.logout),
  wrapAsync(authController.logout)
);

router.post(
  '/refresh-tokens',
  validate(authValidation.refreshToken),
  wrapAsync(authController.refreshToken)
);

router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  wrapAsync(authController.forgotPassword)
);

router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  wrapAsync(authController.resetPassword)
);

router.post(
  '/send-verification-email',
  auth(),
  wrapAsync(authController.sendVerificationEmail)
);

router.post(
  '/verify-email',
  validate(authValidation.verifyEmail),
  wrapAsync(authController.verifyEmail)
);

export default router;
