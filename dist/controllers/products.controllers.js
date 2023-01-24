"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const product_1 = __importDefault(require("../models/product"));
const Product = new product_1.default();
const create = async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body, user_id: req.user._id || req.body.id });
        return res.status(201).json({ message: 'New product created successfully!', data: newProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const getAll = async (_req, res) => {
    try {
        const products = await Product.getAllProducts();
        return res.status(200).json({ data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    try {
        const products = await Product.getProduct(req.params.id);
        return res.status(200).json({ data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const ownership = await Product.getProduct(req.body.id);
        if (!ownership.user_id === req.user._id) {
            return res.status(401).send('Unauthorized!');
        }
        const updatedProduct = await Product.update({ ...req.body });
        return res
            .status(201)
            .json({ message: 'This product has been updated successfully!', data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.update = update;
const deleteProduct = async (req, res) => {
    try {
        const ownership = await Product.getProduct(req.params.id);
        if (!ownership.user_id === req.user._id) {
            return res.status(401).send('Unauthorized!');
        }
        const deletedProduct = await Product.delete(req.params.id);
        return res
            .status(201)
            .json({ message: 'This product has been deleted successfully!', data: deletedProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
