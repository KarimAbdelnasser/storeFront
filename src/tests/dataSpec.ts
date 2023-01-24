import app from '../server';
import supertest from 'supertest';
import generateAuthToken from '../utilities/authToken';
import UserModel from '../models/user';
import ProductModel from '../models/product';
import OrderModel from '../models/order';
import { User } from '../types/user.type';
import { Product } from '../types/product.type';
import Order from '../types/order.type';
const request = supertest(app);
const User = new UserModel();
const Product = new ProductModel();
const Order = new OrderModel();

describe('Test user endpoints responses', () => {
  let token: string;
  let userId: string;
  beforeAll(async () => {
    const user: User = {
      email: 'mohammed@yahoo.com',
      firstname: 'mohammed',
      lastname: 'ahmed',
      password: 'mohammedAhmed',
    };
    const newUser = await User.create(user);
    userId = newUser.id;
    token = generateAuthToken(userId);
  });
  it('Should return a status code 201, response with message new user created successfully!', async () => {
    const response = await request.post('/user/').send({
      firstname: 'karim',
      lastname: 'karim',
      password: 'Karim123',
    });
    expect(response.status).toBe(201);
  });
  it('Should return a status code 400, response with error firstname is required', async () => {
    const response = await request.post('/user/').send({
      lastname: 'karim',
      password: 'Karim123',
    });
    expect(response.status).toBe(400);
  });
  it("Should return a status code 200, response with the user's data", async () => {
    const response = await request.get('/user/me').set('x-auth-token', token);
    expect(response.status).toBe(200);
  });
  it('Should return a status code 201, response with message This user has been updated successfully!', async () => {
    const response = await request
      .put('/user/update')
      .set('x-auth-token', token)
      .send({ firstname: 'karim' });
    expect(response.status).toBe(201);
  });
  it('Should return a status code 201, response with message This user has been deleted successfully!', async () => {
    const response = await request.delete('/user/delete').set('x-auth-token', token);
    expect(response.status).toBe(201);
  });
});

describe('Test product endpoints responses', () => {
  let token: string;
  let userId: string;
  let productId: string;
  beforeAll(async () => {
    const user: User = {
      email: 'mohammed@yahoo.com',
      firstname: 'mohammed',
      lastname: 'ahmed',
      password: 'mohammedAhmed',
    };
    const newUser = await User.create(user);
    userId = newUser.id;
    token = generateAuthToken(newUser.id);
    const product: Product = {
      name: 'first product',
      description: 'simple product',
      price: 10.5,
      id: userId,
    };
    const newProduct = await Product.create(product);
    productId = newProduct.id;
  });
  afterAll(async () => {
    await User.delete(userId);
  });
  it('Should return a status code 201, response with message New product created successfully!', async () => {
    const response = await request.post('/product/newProd').set('x-auth-token', token).send({
      name: 'second product',
      description: 'Nice product',
      price: '3',
    });
    expect(response.status).toBe(201);
  });
  it('Should return a status code 200, response with all products', async () => {
    const response = await request.get('/product/all');
    expect(response.status).toBe(200);
  });
  it('Should return a status code 200, response with one product which have the given id', async () => {
    const response = await request.get(`/product/${productId}`);
    expect(response.status).toBe(200);
  });
  it('Should return a status code 201, response with message This product has been updated successfully!', async () => {
    const response = await request
      .put('/product/update')
      .set('x-auth-token', token)
      .send({
        description: 'Nice product',
        price: '7',
        id: `${productId}`,
      });
    expect(response.status).toBe(201);
  });
  it('Should return a status code 201, response with message This product has been deleted successfully!', async () => {
    const response = await request
      .delete(`/product/delete/${productId}`)
      .set('x-auth-token', token);
    expect(response.status).toBe(201);
  });
});

describe('Test order endpoints responses', () => {
  let token: string;
  let userId: string;
  let productId: string;
  let orderId: string;
  beforeAll(async () => {
    const user: User = {
      email: 'mohammed@yahoo.com',
      firstname: 'mohammed',
      lastname: 'ahmed',
      password: 'mohammedAhmed',
    };
    const newUser = await User.create(user);
    userId = newUser.id;
    token = generateAuthToken(newUser.id);
    const product: Product = {
      name: 'first product',
      description: 'simple product',
      price: 10.5,
      id: userId,
    };
    const newProduct = await Product.create(product);
    productId = newProduct.id;
    const products = [{ id: productId, quantity: 2 }];
    const newOrder = await Order.create(userId, products);
    orderId = newOrder.id;
  });
  afterAll(async () => {
    await User.delete(userId);
    await Product.delete(productId);
  });
  it('Should return a status code 201, response with message New order created successfully!', async () => {
    const response = await request
      .post('/order/newOrder')
      .set('x-auth-token', token)
      .send({ products: [{ id: productId, quantity: 4 }] });
    expect(response.status).toBe(201);
  });
  it("Should return a status code 200, response with the order's data", async () => {
    const response = await request.get(`/order/${orderId}`).set('x-auth-token', token);
    expect(response.status).toBe(200);
  });
  it('Should return a status code 201, response with message This order has been deleted successfully!', async () => {
    const response = await request.delete(`/order/delete/${orderId}`).set('x-auth-token', token);
    expect(response.status).toBe(201);
  });
});
