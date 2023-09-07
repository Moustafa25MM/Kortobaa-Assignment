import request from 'supertest';
import { app } from '../index';
import { authMethods } from '../middlewares/auth';
import User, { UserAttributes } from '../models/user';
import Product from '../models/product';

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
  describe('Create User Route', () => {
    afterAll(async () => {
      await User.destroy({ where: {} });
    });

    it('should create a new user with valid credentials', async () => {
      const newUser = {
        username: 'New User',
        password: 'password123',
        email: 'newuser@example.com',
      };

      const response = await request(app)
        .post('/api/create')
        .send(newUser)
        .expect(201);

      expect(response.body.username).toEqual(newUser.username);
      expect(response.body.email).toEqual(newUser.email);
      expect(response.body.password).not.toEqual(newUser.password);
    });

    it('should not create a user with missing credentials', async () => {
      const newUser = {
        username: 'New User',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/create')
        .send(newUser)
        .expect(400);

      expect(response.body.error).toBe('Please provide email');
    });
  });
  describe('Create Product Route', () => {
    let user: UserAttributes;
    let token: string | String;
    beforeAll(async () => {
      const userData: UserAttributes = {
        id: 98,
        username: 'Test User',
        password: authMethods.hashPassword('password').toString(),
        email: 'user@example.com',
      };

      await User.create(userData);
      token = authMethods.generateJWT({ id: userData.id.toString() });
    });

    afterAll(async () => {
      await User.destroy({ where: {} });
      await Product.destroy({ where: {} });
    });

    it('should not create a product without an image', async () => {
      const newProduct = {
        title: 'New Product',
        price: 100,
      };

      const response = await request(app)
        .post('/product/create')
        .set('Authorization', `${token}`)
        .send(newProduct)
        .expect(400);

      expect(response.body.error).toBe('No Image was uploaded');
    });
  });
  describe('Get Product By Id Route', () => {
    let user: UserAttributes;
    let token: string | String;

    beforeAll(async () => {
      const userData: UserAttributes = {
        id: 97,
        username: 'Test User',
        password: authMethods.hashPassword('password').toString(),
        email: 'user@example.com',
      };

      await User.create(userData);
      token = authMethods.generateJWT({ id: userData.id.toString() });
    });

    afterAll(async () => {
      await User.destroy({ where: {} });
      await Product.destroy({ where: {} });
    });

    it('should not retrieve product if user is not authenticated', async () => {
      const response = await request(app)
        .get('/product/1') // Assuming 1 is an id of a product
        .expect(401);

      expect(response.body.error).toBe('Unauthorized: Token not provided');
    });

    it('should not retrieve product if product is not found', async () => {
      const response = await request(app)
        .get('/product/1000')
        .set('Authorization', `${token}`)
        .expect(404);

      expect(response.body.error).toBe('Product not found');
    });
  });
});
