"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = require("../routes/users");
const products_1 = require("../routes/products");
const orders_1 = require("../routes/orders");
module.exports = (app) => {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use('/user', users_1.usersRouter);
    app.use('/product', products_1.productsRouter);
    app.use('/order', orders_1.ordersRouter);
};
