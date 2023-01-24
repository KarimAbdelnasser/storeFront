import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export = function generateAuthToken(id: string) {
  const token = jwt.sign({ _id: id }, process.env.jwtPrivateKey as Secret);
  return token;
};
