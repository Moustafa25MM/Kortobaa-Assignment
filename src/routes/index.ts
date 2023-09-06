import { Router } from 'express';
import { userRoute } from './user';

const router = Router();

router.use('/api', userRoute);

export const indexRouter: Router = router;
