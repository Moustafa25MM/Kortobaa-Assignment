import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './auth';
import { userControllers } from '../controllers/user';

dotenv.config();

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email } = req.body;
  let { password } = req.body;

  password = authMethods.hashPassword(password);

  const user = await userControllers.create({
    username,
    password,
    email,
  });

  if (!user) throw new Error('Error: user is not created');

  return res.status(201).json(user);
};

export const userMiddlewares = {
  createUser,
};
