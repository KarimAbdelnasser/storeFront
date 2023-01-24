"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_DATABASE_TEST, DB_USER, DB_PASSWORD } = process.env;
const pool = new pg_1.Pool(NODE_ENV === "test"
    ? {
        host: DB_HOST,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
    }
    : {
        host: DB_HOST,
        database: DB_DATABASE_TEST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
    });
exports.default = pool;
