import express from 'express';
import * as userController from '../../controllers/userController';
import * as userValidation from '../../validations/userValidation';
import wrapAsync from '../../utils/wrapAsync';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';

const router = express.Router();

router.get(
  '/',
  auth('getUser'),
  validate(userValidation.getAllUsers),
  wrapAsync(userController.getAllUsers)
);

router.post(
  '/create',
  auth('manageUsers'),
  validate(userValidation.createUser),
  wrapAsync(userController.createUser)
);

router.get(
  '/:userId',
  auth('getUser'),
  validate(userValidation.getUser),
  wrapAsync(userController.getUser)
);

router.patch(
  '/:userId',
  auth('getUser'),
  validate(userValidation.updateUser),
  wrapAsync(userController.updateUser)
);

router.delete(
  '/:userId',
  auth('getUser'),
  validate(userValidation.deleteUser),
  wrapAsync(userController.deleteUser)
);

export default router;
