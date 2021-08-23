import express from 'express';

// routes
import userRoute from './userRoute';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
