import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
declare const process: any;

const { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_DATABASE_TEST, DB_USER, DB_PASSWORD } =
  process.env;
const pool = new Pool(
  NODE_ENV === 'test'
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
      }
);
export default pool;
