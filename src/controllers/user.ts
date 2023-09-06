import { models } from '../models';

const create = (data: any) => models.User.create(data);

const getById = (id: string) => {
  const user = models.User.findByPk(id);
  return user;
};

export const userControllers = {
  create,
  getById,
};
