import { Request, Response } from 'express';
import ProductModel from '../models/product';
import { productSchema } from '../types/product.type';
const Product = new ProductModel();

export const create = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newProduct = await Product.create({ ...req.body, user_id: req.user._id || req.body.id });
    return res.status(201).json({ message: 'New product created successfully!', data: newProduct });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const products = await Product.getAllProducts();
    return res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const products = await Product.getProduct(req.params.id);
    return res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const update = async (req: Request & { user?: any }, res: Response) => {
  try {
    const ownership = await Product.getProduct(req.body.id);
    if (!ownership.user_id === req.user._id) {
      return res.status(401).send('Unauthorized!');
    }
    const updatedProduct = await Product.update({ ...req.body });
    return res
      .status(201)
      .json({ message: 'This product has been updated successfully!', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request & { user?: any }, res: Response) => {
  try {
    const ownership = await Product.getProduct(req.params.id);
    if (!ownership.user_id === req.user._id) {
      return res.status(401).send('Unauthorized!');
    }
    const deletedProduct = await Product.delete(req.params.id);
    return res
      .status(201)
      .json({ message: 'This product has been deleted successfully!', data: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
