import { NextFunction, Request, Response } from 'express';
import { userControllers } from '../controllers/user';
import { productControllers } from '../controllers/product';
import { cloudi } from './imagesUpload';
import clearImage from './clearImage';
import { paginationOption } from '../libs/paginations';

const createProduct = async (req: any, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const { title, price } = req.body;
  if (!title) {
    return res.status(404).json({ error: 'Title not found' });
  }
  if (title.length < 5) {
    return res
      .status(404)
      .json({ error: 'Title should have 5 chars at least' });
  }
  if (!price) {
    return res.status(404).json({ error: 'Price not found' });
  }
  if (price < 9) {
    return res.status(404).json({ error: 'price should be at least 9' });
  }
  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let image: any = '';
    if (!req.file) {
      return res.status(400).json({ error: 'No Image was uploaded' });
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
const getProductById = async (req: any, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await productControllers.getById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(product.userId);
    console.log(userId);
    if (product.userId != userId) {
      return res
        .status(403)
        .json({ error: 'Access denied. You do not own this product.' });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req: any, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const { title, price } = req.body;

  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let image = '';

    if (req.file) {
      const uploadedImg = req.file.path;
      const images = await cloudi.uploader.upload(uploadedImg, {
        public_id: `${productId}`,
        width: 500,
        height: 500,
        crop: 'fill',
      });
      image = images.url;
    } else {
      const product = await productControllers.getById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      if (product?.userId != userId) {
        return res
          .status(403)
          .json({ error: 'Access denied. You do not own this product.' });
      }
      image = product.image;
    }

    const product = await productControllers.update(productId, userId, {
      title,
      image,
      price,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const product = await productControllers.getById(productId);

    const result = await productControllers.remove(productId, userId);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product?.userId != userId) {
      return res
        .status(403)
        .json({ error: 'Access denied. You do not own this product.' });
    }
    if (product?.image) {
      const publicId = product.image.split('/').pop()?.split('.')[0]!;
      clearImage(publicId);
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
const getUserProducts = async (req: any, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  try {
    const user = await userControllers.getById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const products = await productControllers.getByUserId(userId);
    let pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 5;
    pageSize = Math.min(20, pageSize);
    const totalDocs = products.length;
    const maxPageNumber = Math.ceil(totalDocs / pageSize);

    let pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber as string)
      : 1;
    pageNumber = Math.min(Math.max(pageNumber, 1), maxPageNumber);
    const paginatedProducts = products.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );

    const paginationOptions = paginationOption(pageSize, pageNumber, totalDocs);

    return res.status(200).json({
      pagination: paginationOptions,
      employees: paginatedProducts,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const productMiddlewares = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getUserProducts,
};
