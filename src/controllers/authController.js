import { HTTP_CODE } from '../config/constants';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import * as tokenService from '../services/tokenService';
import * as emailService from '../services/emailService';

const register = async (req, res) => {
  try {
    const existEmail = await userService.getUserByEmail(req.body.email);

    if (existEmail) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .send({ message: 'User already created' });
    }

    const user = await userService.createUser(req.body);

    return res.status(HTTP_CODE.CREATED).send(user);
  } catch (error) {
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const tokens = await tokenService.generateAuthToken(user);

    return res.status(HTTP_CODE.OK).send({ user, tokens });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);

    return res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);

    res.status(200).send({ ...tokens });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);

    return res
      .status(HTTP_CODE.OK)
      .send({ message: 'Password is changed successfully' });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      req.body.email
    );
    await emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );

    return res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const sendVerificationEmail = async (req, res, next) => {
  try {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      req.userData
    );

    await emailService.sendVerificationEmail(
      req.userData.email,
      verifyEmailToken
    );

    return res
      .status(HTTP_CODE.OK)
      .send({ message: 'We have sent verify user to your email' });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    await authService.verifyEmail(req.query.token);

    return res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  logout,
  refreshToken,
  resetPassword,
  forgotPassword,
  verifyEmail,
  sendVerificationEmail,
};
