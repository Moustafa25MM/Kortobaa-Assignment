import { Router } from 'express';
import { userRoute } from './user';
import { productRoute } from './product';

const router = Router();

router.use('/api', userRoute);
router.use('/product', productRoute);

export const indexRouter: Router = router;
