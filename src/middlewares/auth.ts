import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction } from 'express';
import { userControllers } from '../controllers/user';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;

const hashPassword = (password: String): String =>
  bcrypt.hashSync(password as string, 10);

const comparePasswd = async (
  enteredPassword: string,
  DB_password: any
): Promise<boolean> => {
  const result = await bcrypt.compare(enteredPassword, DB_password);
  return result;
};

type IokenPayload = {
  id: string;
};

const generateJWT = (payload: IokenPayload): String =>
  jwt.sign(payload, JWTSecret as string, { expiresIn: '7d' });

const isUserAuthorized = async (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  try {
    const payload: { id: string } = jwt.verify(token, JWTSecret as string) as {
      id: string;
    };
    const userData = await userControllers.getById(payload.id);
    if (!userData) {
      return res.status(400);
    }

    req.user = {
      id: userData.id,
      email: userData.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export const authMethods = {
  hashPassword,
  comparePasswd,
  generateJWT,
  isUserAuthorized,
};
