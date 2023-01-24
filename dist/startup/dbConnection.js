"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = __importDefault(require("../db/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = async () => {
    try {
        await db_1.default.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`);
        console.log("All models were synchronized successfully.");
    }
    catch (err) {
        console.log("Unable to connect to the database: ", err);
    }
};
