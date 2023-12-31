import { Router } from 'express';
import { productMiddlewares } from '../middlewares/product';
import { productUpload } from '../middlewares/imagesUpload';
import { authMethods } from '../middlewares/auth';
const router = Router();

router.post(
  '/create',
  productUpload.single('image'),
  authMethods.isUserAuthorized,
  productMiddlewares.createProduct
);

router.patch(
  '/update/:productId',
  productUpload.single('image'),
  authMethods.isUserAuthorized,
  productMiddlewares.updateProduct
);
router.delete(
  '/delete/:productId',
  authMethods.isUserAuthorized,
  productMiddlewares.deleteProduct
);
router.get(
  '/:productId/',
  authMethods.isUserAuthorized,
  productMiddlewares.getProductById
);
router.get(
  '/user/products',
  authMethods.isUserAuthorized,
  productMiddlewares.getUserProducts
);
export const productRoute: Router = router;
