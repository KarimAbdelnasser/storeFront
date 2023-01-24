"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.getOne = exports.create = void 0;
const order_1 = __importDefault(require("../models/order"));
const Order = new order_1.default();
//Create a new order
const create = async (req, res) => {
    try {
        if (req.user) {
            const userId = req.user._id;
            const newProduct = await Order.create(userId, req.body.products);
            return res.status(201).json({ message: 'New order created successfully!', data: newProduct });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
//Get an exist order
const getOne = async (req, res) => {
    try {
        const products = await Order.getOrder(req.params.id);
        return res.status(200).json({ data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOne = getOne;
//Delete an exist order
const deleteOrder = async (req, res) => {
    try {
        const ownership = await Order.getOrder(req.params.id);
        if (!ownership[0].user_id === req.user._id) {
            return res.status(401).send('Unauthorized!');
        }
        const deletedOrder = await Order.delete(req.params.id);
        return res
            .status(201)
            .json({ message: 'This order has been deleted successfully!', data: deletedOrder });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteOrder = deleteOrder;
