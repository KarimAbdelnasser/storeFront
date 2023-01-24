import express from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from '../routes/users';
import { productsRouter } from '../routes/products';
import { ordersRouter } from '../routes/orders';

export = (app: express.Application) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use('/user', usersRouter);
  app.use('/product', productsRouter);
  app.use('/order', ordersRouter);
};
