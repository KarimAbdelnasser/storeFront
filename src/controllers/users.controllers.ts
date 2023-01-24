import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user';
import generateAuthToken from '../utilities/authToken';
const User = new UserModel();
dotenv.config();
declare const process: any;

export const create = async (req: Request, res: Response) => {
  try {
    const { ...newUserData } = req.body;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);
    newUserData.password = hashedPassword;
    const newUser = await User.create({ ...newUserData });
    const token = await generateAuthToken(newUser.id);
    return res
      .status(201)
      .json({ message: 'New user created successfully!', data: newUser, token: token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUser = async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await User.getUser(req.user._id);
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const update = async (req: Request & { user?: any }, res: Response) => {
  try {
    let updatedUser = {};
    if ('password' in req.body) {
      const { ...newUserData } = req.body;
      const password = req.body.password;
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
      newUserData.password = hashedPassword;
      updatedUser = await User.update({
        ...newUserData,
        id: req.user._id,
      });
    } else {
      const { ...newUserData } = req.body;
      updatedUser = await User.update({ ...newUserData, id: req.user._id });
    }
    return res
      .status(201)
      .json({ message: 'This user has been updated successfully!', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request & { user?: any }, res: Response) => {
  try {
    const deletedUser = await User.delete(req.user._id);
    return res
      .status(201)
      .json({ message: 'This user has been deleted successfully!', data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
