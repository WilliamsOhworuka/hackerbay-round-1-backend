import { Router } from 'express';
import signinRoute from './signin';

const router = Router();

router.use(signinRoute);

export default router;
