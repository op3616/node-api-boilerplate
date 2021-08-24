import express from 'express';

// controllers
import * as userController from '../../controllers/userController';

import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';

import * as userValidation from '../../validations/userValidation';

const router = express.Router();

router.post(
  '/create',
  validate(userValidation.createUser),
  userController.createUser
);

router.get(
  '/all',
  validate(userValidation.getAllUsers),
  userController.getAllUsers
);

router.get(
  '/:userId',
  auth('getUser'),
  validate(userValidation.getUser),
  userController.getUser
);

router.patch(
  '/:userId',
  validate(userValidation.updateUser),
  userController.updateUser
);

router.delete(
  '/:userId',
  validate(userValidation.deleteUser),
  userController.deleteUser
);

export default router;
