import { User } from '../types/user.type';
import db from '../db/db';
type returnUser = {
  id: string;
  email?: string;
  firstname: string;
  lastname: string;
  password: string;
};
class UserModel {
  //Create a new user
  async create(user: User): Promise<returnUser> {
    try {
      const con = await db.connect();
      const sql = `INSERT INTO users (email,firstname,lastname,password) VALUES ($1,$2,$3,$4) returning id,email;`;
      const result = await con.query(sql, [
        user.email,
        user.firstname,
        user.lastname,
        user.password,
      ]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('User not found or problem with creation');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Get an exist user
  async getUser(id: string): Promise<User> {
    try {
      const con = await db.connect();
      const sql = `SELECT id,email,firstname,lastname FROM users WHERE id=$1;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('User not found or problem with selection');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Update an exist user
  async update(user: User): Promise<User> {
    try {
      const con = await db.connect();
      const updateFields: Record<string, unknown> = user;
      let sql = `UPDATE users SET `;
      let i = 1;
      const values = [];
      for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(updateFields, key) && key !== 'id') {
          sql += `${key} = $${i},`;
          values.push(updateFields[key]);
          i++;
        }
      }
      sql = sql.slice(0, -1);
      sql += ` WHERE id = $${i} RETURNING email,firstname,lastname;`;
      values.push(user.id);
      const result = await con.query(sql, values);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('User not found or problem with update');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
  //Delete an exist user
  async delete(id: string): Promise<User> {
    try {
      const con = await db.connect();
      const sql = `DELETE FROM users WHERE id=$1 RETURNING id,email;`;
      const result = await con.query(sql, [id]);
      con.release();
      if (result.rowCount === 0) {
        throw new Error('User not found or problem with deletion');
      }
      return result.rows[0];
    } catch (error: unknown) {
      throw new Error(`${(error as Error).message}`);
    }
  }
}
export default UserModel;
