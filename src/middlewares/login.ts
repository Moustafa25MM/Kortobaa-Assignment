import { Request, Response } from 'express';
import { authMethods } from './auth';
import { userControllers } from '../controllers/user';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userDataFromDB: any = await userControllers.getByEmail(email);

  if (!userDataFromDB) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const compare = await authMethods.comparePasswd(
    password,
    userDataFromDB.password
  );
  if (!compare) res.status(401).json({ error: 'Invalid email or password' });
  else {
    const token = authMethods.generateJWT({ id: userDataFromDB.id });

    const userData = {
      id: userDataFromDB.id,
      username: userDataFromDB.username,
      email: userDataFromDB.email,
    };

    res.status(200).json({ token, user: userData });
  }
};

export const loginMethods = {
  userLogin,
};
