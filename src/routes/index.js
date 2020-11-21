import { Router } from 'express';
import signinRoute from './signin.route';
import protectedRoutes from './protected.route';

const router = Router();

router.use(signinRoute, protectedRoutes);

export default router;
