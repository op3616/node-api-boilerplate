import bcrypt from 'bcrypt';
import { HTTP_CODE, tokenTypes } from '../config/constants';
import ApiError from '../utils/apiError';
import Token from '../models/Token';

import * as userService from './userService';
import * as tokenService from './tokenService';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, 'Incorrect user');
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, 'Incorrect password');
  }

  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const getRefreshToken = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!getRefreshToken) {
    throw new ApiError(HTTP_CODE.NOT_FOUND, 'Not found');
  }

  await getRefreshToken.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
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

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const getResetPasswordToken = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(getResetPasswordToken.user);
    if (!user) {
      throw new Error();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await userService.updateUserById(user.id, { password: hash });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(HTTP_CODE.UNAUTHORIZED, 'Email verification failed');
  }
};

export { login, logout, resetPassword, refreshAuth, verifyEmail };
