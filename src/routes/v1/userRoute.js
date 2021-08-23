import express from 'express';

// middlewares
import validate from '../../middlewares/validate';

// validations
import * as userValidation from '../../validations/userValidation';

// controllers
import * as userController from '../../controllers/userController';

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/register',
  validate(userValidation.createUser),
  userController.createUser
);

export default router;
