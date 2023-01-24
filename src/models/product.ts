import { Product } from '../types/product.type';
import db from '../db/db';
class ProductModel {
  //Create a new product
  async create(product: Product): Promise<Product> {
    try {
      const con = await db.connect();
      const sql = `INSERT INTO products (name,description,price,user_id) VALUES ($1,$2,$3,$4) returning id,name,description,price;`;
      const result = await con.query(sql, [
        product.name,
        product.description,
        product.price,
        product.user_id,
      ]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('Product not found or problem with creation');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT id,name,description,price FROM products;`;
      const result = await con.query(sql);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('No Products found!');
      }
      return result.rows;
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Get an exist product
  async getProduct(id: string): Promise<Product> {
    try {
      const con = await db.connect();
      const sql = `SELECT id,name,description,price FROM products WHERE id=$1;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('Product not found or problem with selection');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Update an exist product
  async update(product: Product): Promise<Product> {
    try {
      const con = await db.connect();
      const updateFields: Record<string, unknown> = product;
      let sql = `UPDATE products SET `;
      let i = 1;
      const values = [];
      for (const key in product) {
        if (Object.prototype.hasOwnProperty.call(updateFields, key) && key !== 'id') {
          sql += `${key} = $${i},`;
          values.push(updateFields[key]);
          i++;
        }
      }
      sql = sql.slice(0, -1);
      sql += ` WHERE id = $${i} RETURNING id,name,description,price;`;
      values.push(product.id);
      const result = await con.query(sql, values);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('Product not found or problem with update');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Delete an exist product
  async delete(id: string): Promise<Product> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM products WHERE id=$1 RETURNING id,name;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('Product not found or problem with deletion');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
}
export default ProductModel;
