import { models } from '../models';

const create = (data: any) => models.User.create(data);

export const userControllers = {
  create,
};
