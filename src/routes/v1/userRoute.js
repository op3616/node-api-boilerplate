import express from 'express';

// controllers
import * as userController from '../../controllers/userController';

import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('getUsers'), userController.getUser);

export default router;
