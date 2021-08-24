import { HTTP_CODE } from '../config/constants';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import * as tokenService from '../services/tokenService';

const register = async (req, res) => {
  try {
    const existEmail = await userService.getUserByEmail(req.body.email);

    if (existEmail) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .json({ message: 'User already created' });
    }

    await userService.createUser(req.body);

    return res
      .status(HTTP_CODE.CREATED)
      .json({ message: 'Created successfully' });
  } catch (error) {
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const token = await tokenService.generateAuthToken(user);

    return res.status(HTTP_CODE.OK).json({ user, token });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);

    return res.status(200).json({ message: 'Log out success' });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);

    res.status(200).json({ ...tokens });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);

    return res
      .status(HTTP_CODE.NO_CONTENT)
      .json({ message: 'Reset password success' });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, refreshToken, resetPassword };
