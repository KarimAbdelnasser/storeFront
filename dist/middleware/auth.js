"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = function (req, res, next) {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).send('Access denied, no token provided!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token!');
    }
};
