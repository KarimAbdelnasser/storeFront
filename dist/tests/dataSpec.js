"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const authToken_1 = __importDefault(require("../utilities/authToken"));
const user_1 = __importDefault(require("../models/user"));
const product_1 = __importDefault(require("../models/product"));
const order_1 = __importDefault(require("../models/order"));
const request = (0, supertest_1.default)(server_1.default);
const User = new user_1.default();
const Product = new product_1.default();
const Order = new order_1.default();
describe('Test user endpoints responses', () => {
    let token;
    let userId;
    beforeAll(async () => {
        const user = {
            email: 'mohammed@yahoo.com',
            firstname: 'mohammed',
            lastname: 'ahmed',
            password: 'mohammedAhmed',
        };
        const newUser = await User.create(user);
        userId = newUser.id;
        token = (0, authToken_1.default)(userId);
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
    let token;
    let userId;
    let productId;
    beforeAll(async () => {
        const user = {
            email: 'mohammed@yahoo.com',
            firstname: 'mohammed',
            lastname: 'ahmed',
            password: 'mohammedAhmed',
        };
        const newUser = await User.create(user);
        userId = newUser.id;
        token = (0, authToken_1.default)(newUser.id);
        const product = {
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
    let token;
    let userId;
    let productId;
    let orderId;
    beforeAll(async () => {
        const user = {
            email: 'mohammed@yahoo.com',
            firstname: 'mohammed',
            lastname: 'ahmed',
            password: 'mohammedAhmed',
        };
        const newUser = await User.create(user);
        userId = newUser.id;
        token = (0, authToken_1.default)(newUser.id);
        const product = {
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
