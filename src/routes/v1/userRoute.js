import express from 'express';

// middlewares
import validate from '../../middlewares/validate';

// validations
import * as validations from '../../validations/example';

// controllers
import * as userController from '../../controllers/userController';

const router = express.Router();

router.get('/', userController.getUsers);
router.post(
  '/validate-example',
  validate(validations.validateExample),
  userController.validateFormExample
);

export default router;
