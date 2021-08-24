import bcrypt from 'bcrypt';
import { HTTP_CODE, tokenTypes } from '../config/constants';
import ApiError from '../utils/apiError';

import * as userService from './userService';
import * as tokenService from './tokenService';

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

export const refreshAuth = async (refreshToken) => {
  try {
    const getRefreshToken = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const getUser = await userService.getUserById(getRefreshToken.user);

    if (!getUser) {
      throw new Error();
    }

    await getRefreshToken.remove();
    return tokenService.generateAuthToken(getUser);
  } catch (error) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, 'Please authenticate');
  }
};
