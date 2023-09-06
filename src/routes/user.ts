import { Router } from 'express';
import { userMiddlewares } from '../middlewares/user';

const router = Router();

router.post('/create', userMiddlewares.createUser);
router.get('/user/:id', userMiddlewares.getUserById);

export const userRoute: Router = router;
