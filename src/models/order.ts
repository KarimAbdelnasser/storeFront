import Order from '../types/order.type';
import db from '../db/db';

type Prod = {
  id: string;
  quantity: number;
};

interface Result {
  id: string;
  status: string;
  user_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
}

class OrderModel {
  //Create a new order
  async create(userId: string, products: Prod[]): Promise<Order> {
    try {
      //insert order row
      const con = await db.connect();
      const sql = `INSERT INTO orders (user_id) VALUES ($1) returning id,status;`;
      const orderResult = await con.query(sql, [userId]);
      const orderId = orderResult.rows[0].id;
      //insert order_products rows
      for (const product of products) {
        const insertOrderProductQuery = `INSERT INTO order_products (order_id, product_id,quantity) VALUES ($1, $2, $3)`;
        await con.query(insertOrderProductQuery, [orderId, product.id, product.quantity]);
      }
      con.release();
      if (orderResult.rowCount === 0) {
        throw new Error('Order not found or problem with creation');
      }
      return orderResult.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Get order
  async getOrder(id: string): Promise<Result[]> {
    try {
      const con = await db.connect();
      const sql = `SELECT order_products.id,user_id,order_products.product_id,order_products.quantity,order_id FROM orders
      LEFT JOIN order_products ON orders.id = order_products.order_id
      WHERE order_id = $1;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('order not found or problem with selection');
      }
      return result.rows;
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Delete an exist order
  async delete(id: string): Promise<Order> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING id,status;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('Order not found or problem with deletion');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
}
export default OrderModel;
