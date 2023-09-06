import { models } from '../models';

const create = (userId: string, data: any) => {
  const productData = { ...data, userId };
  const product = models.Product.create(productData);
  return product;
};
const getById = (productId: string) => {
  const product = models.Product.findByPk(productId);
  return product;
};

export const productControllers = {
  create,
  getById,
};
