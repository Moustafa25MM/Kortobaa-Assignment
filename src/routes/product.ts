import { Router } from 'express';
import { productMiddlewares } from '../middlewares/product';
import { productUpload } from '../middlewares/imagesUpload';

const router = Router();

router.post(
  '/user/:userId/create/product',
  productUpload.single('image'),
  productMiddlewares.createProduct
);

router.patch(
  '/user/:userId/update/:productId',
  productUpload.single('image'),
  productMiddlewares.updateProduct
);
router.delete(
  '/user/:userId/delete/:productId',
  productMiddlewares.deleteProduct
);
router.get('/:productId/user/:userId', productMiddlewares.getProductById);

export const productRoute: Router = router;
