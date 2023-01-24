import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
declare const process: any;
export = function generateAuthToken(id: string) {
  const token = jwt.sign({ _id: id }, process.env.jwtPrivateKey);
  return token;
};
