"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_DATABASE_TEST, DB_USER, DB_PASSWORD } = process.env;
const dbCreation = async () => {
    try {
        console.log(NODE_ENV);
        const client = new pg_1.Client({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
        });
        client.connect();
        let dbName;
        if (NODE_ENV.trim() === 'dev') {
            dbName = DB_DATABASE;
        }
        else {
            dbName = DB_DATABASE_TEST;
        }
        client.query(`SELECT * FROM ${dbName}`, (err) => {
            if (err) {
                if (err.message.includes(`database "${dbName}" already exists`)) {
                    console.log(`${dbName} already exists`);
                    client.end();
                }
                else if (err.message.includes('database does not exist') ||
                    err.message.includes(`relation "${dbName}" does not exist`)) {
                    console.log(dbName);
                    client.query(`CREATE DATABASE ${dbName}`, (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                        else {
                            console.log(`Created ${dbName} successfully!`);
                            client.end();
                        }
                    });
                }
                else {
                    console.log(err);
                    client.end();
                }
            }
        });
    }
    catch (err) {
        console.log('Unable to connect to the database: ', err);
    }
};
dbCreation();
const pool = new pg_1.Pool(NODE_ENV.trim() === 'test'
    ? {
        host: DB_HOST,
        database: DB_DATABASE_TEST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
    }
    : {
        host: DB_HOST,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
    });
exports.default = pool;
