import User from '../models/User';
import { HTTP_CODE } from '../config/constants';
import * as userService from '../services/userService';
import pick from '../utils/pick';
import ApiError from '../utils/apiError';

const createUser = async (req, res, next) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .send({ message: 'User already created' });
    }

    const user = await userService.createUser(req.body);

    return res.status(HTTP_CODE.CREATED).send(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const data = await userService.queryUsers(filter, options);

    res.status(HTTP_CODE.OK).send(data);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.userId);

    if (!user) {
      throw new ApiError(HTTP_CODE.NOT_FOUND, 'User not found');
    }

    return res.status(HTTP_CODE.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUserById(req.params.userId, req.body);

    res.status(HTTP_CODE.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUserById(req.params.userId);

    res.status(HTTP_CODE.OK).send({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser, getUser, createUser, getAllUsers };
