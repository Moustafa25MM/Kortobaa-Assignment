import request from 'supertest';
import { app } from '../index';
import { authMethods } from '../middlewares/auth';
import User, { UserAttributes } from '../models/user';

describe('Login Route', () => {
  beforeAll(async () => {
    const userData: UserAttributes = {
      id: 99,
      username: 'Test User',
      password: authMethods.hashPassword('password').toString(),
      email: 'user@example.com',
    };

    await User.create(userData);
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
  });

  it('should log in users with valid credentials', async () => {
    const credentials = {
      email: 'user@example.com',
      password: 'password',
    };

    const response = await request(app)
      .post('/api/login')
      .send(credentials)
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
  });

  it('should not log in with incorrect email or password', async () => {
    const credentials = {
      email: 'wrong@example.com',
      password: 'wrong',
    };

    const response = await request(app)
      .post('/api/login')
      .send(credentials)
      .expect(401);

    expect(response.body.error).toBe('Invalid email or password');
  });
});
