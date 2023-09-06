import { models } from '../models';

const create = (userId: string, data: any) => {
  const productData = { ...data, userId };
  const product = models.Product.create(productData);
  return product;
};

export const productControllers = {
  create,
};
