import { HTTP_CODE } from '../config/constants';
import * as userService from '../services/userService';
import pick from '../utils/pick';
import ApiError from '../utils/apiError';

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(HTTP_CODE.CREATED).send(user);
};

const getAllUsers = async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const data = await userService.queryUsers(filter, options);

  res.status(HTTP_CODE.OK).send(data);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(HTTP_CODE.NOT_FOUND, 'User not found');
  }

  return res.status(HTTP_CODE.OK).send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);

  res.status(HTTP_CODE.OK).send(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);

  res.status(HTTP_CODE.OK).send({ message: 'User deleted' });
};

export { updateUser, deleteUser, getUser, createUser, getAllUsers };
