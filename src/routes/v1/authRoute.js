import express from 'express';

// middlewares
import validate from '../../middlewares/validate';

import * as authValidate from '../../validations/authValidation';
import * as authController from '../../controllers/authController';

const router = express.Router();

router.post(
  '/register',
  validate(authValidate.register),
  authController.register
);

router.post('/login', validate(authValidate.login), authController.login);

export default router;
