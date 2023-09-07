import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './auth';
import { userControllers } from '../controllers/user';

dotenv.config();

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email } = req.body;
  let { password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Please provide username' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Please provide email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Please provide password' });
  }
  password = authMethods.hashPassword(password);

  const user = await userControllers.create({
    username,
    password,
    email,
  });

  if (!user) throw new Error('Error: user is not created');

  return res.status(201).json(user);
};

const getUserById = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await userControllers.getById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const userMiddlewares = {
  createUser,
  getUserById,
};
