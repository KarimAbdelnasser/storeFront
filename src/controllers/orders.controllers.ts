import { Request, Response } from 'express';
import OrderModel from '../models/order';
const Order = new OrderModel();

export const create = async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user._id;
    const newProduct = await Order.create(userId, req.body.products);
    return res.status(201).json({ message: 'New order created successfully!', data: newProduct });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const products = await Order.getOrder(req.params.id);
    return res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteOrder = async (req: Request & { user?: any }, res: Response) => {
  try {
    const ownership = await Order.getOrder(req.params.id);
    if (!ownership[0].user_id === req.user._id) {
      return res.status(401).send('Unauthorized!');
    }
    const deletedOrder = await Order.delete(req.params.id);
    return res
      .status(201)
      .json({ message: 'This order has been deleted successfully!', data: deletedOrder });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
