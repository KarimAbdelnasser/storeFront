"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    email: joi_1.default.string().email().min(7).max(20),
    firstname: joi_1.default.string().min(3).max(15).required(),
    lastname: joi_1.default.string().min(3).max(15).required(),
    password: joi_1.default.string().min(4).max(25).required(),
});
exports.userSchema = schema;
