import { HTTP_CODE } from '../config/constants';
import User from '../models/User';
import * as authService from '../services/authService';

export const getUsers = (req, res) => {
  return res.status(200).json({ message: 'No user here!!' });
};

export const createUser = async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .json({ message: 'Email already created' });
    }

    await authService.createUser(req.body);

    return res
      .status(HTTP_CODE.CREATED)
      .json({ message: 'Create user successfully' });
  } catch (error) {
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ error });
  }
};
