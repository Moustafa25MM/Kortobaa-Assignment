import { Router } from 'express';
import { productMiddlewares } from '../middlewares/product';
import { productUpload } from '../middlewares/imagesUpload';

const router = Router();

router.post(
  '/user/:userId/create/product',
  productUpload.single('image'),
  productMiddlewares.createProduct
);

export const productRoute: Router = router;
