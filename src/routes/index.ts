import { Router } from 'express';
import { UserRouter} from '../app/modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
