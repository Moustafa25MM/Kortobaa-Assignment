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
const update = async (productId: string, userId: string, data: any) => {
  const product = await models.Product.findOne({
    where: { id: productId, userId },
  });
  if (product) {
    await product.update(data);
  }
  return product;
};

const remove = async (productId: string, userId: string) => {
  const product = await models.Product.findOne({
    where: { id: productId, userId },
  });
  if (product) {
    await product.destroy();
    return true;
  }
  return false;
};
const getByUserId = async (userId: string) => {
  const products = await models.Product.findAll({ where: { userId } });
  return products;
};
export const productControllers = {
  create,
  getById,
  update,
  remove,
  getByUserId,
};
