import { Router } from 'express';
import { userMiddlewares } from '../middlewares/user';
import { loginMethods } from '../middlewares/login';

const router = Router();

router.use('/login', loginMethods.userLogin);

router.post('/create', userMiddlewares.createUser);
router.get('/user/:id', userMiddlewares.getUserById);

export const userRoute: Router = router;
