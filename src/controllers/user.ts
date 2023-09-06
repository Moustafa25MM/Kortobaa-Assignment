import { models } from '../models';

const create = (data: any) => models.User.create(data);

const getById = (id: string) => {
  const user = models.User.findByPk(id);
  return user;
};
const getByEmail = (email: string) => {
  const user = models.User.findOne({
    where: { email },
  });
  return user;
};

export const userControllers = {
  create,
  getById,
  getByEmail,
};
