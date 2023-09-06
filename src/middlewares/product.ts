import { NextFunction, Request, Response } from 'express';
import { userControllers } from '../controllers/user';
import { productControllers } from '../controllers/product';
import { cloudi } from './imagesUpload';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { title, price } = req.body;
  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let image: any = '';
    if (!req.file) {
      image =
        'https://console.cloudinary.com/console/c-d982253c4e1988dd33d1b4d68832c7/media_library/search/asset/a2711894209c60ead019cc239fd8ce88/manage?q=&context=manage';
    } else {
      const uploadedImg = await cloudi.uploader.upload(req.file.path, {
        public_id: `${Date.now}`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
      image = uploadedImg.url;
    }

    const product = await productControllers.create(userId, {
      title,
      image,
      price,
    });

    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const productMiddlewares = {
  createProduct,
};
