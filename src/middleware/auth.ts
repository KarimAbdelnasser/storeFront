import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export = function (req: Request & { user?: any }, res: Response, next: NextFunction) {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send('Access denied, no token provided!');
    }
    const decoded = jwt.verify(token, process.env.jwtPrivateKey as Secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token!');
  }
};
