import bcrypt from 'bcrypt';
import { HTTP_CODE } from '../config/constants';
import ApiError from '../utils/apiError';

import * as userService from './userService';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
export const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new ApiError(HTTP_CODE.BAD_REQUEST, 'Password not match');
  }

  return user;
};
