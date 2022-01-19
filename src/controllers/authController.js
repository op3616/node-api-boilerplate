import { HTTP_CODE } from '../config/constants';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import * as tokenService from '../services/tokenService';
import * as emailService from '../services/emailService';

const register = async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(HTTP_CODE.CREATED).send(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);
  const tokens = await tokenService.generateAuthToken(user);

  return res.status(HTTP_CODE.OK).send({ user, tokens });
};

const logout = async (req, res) => {
  await authService.logout(req.body.refreshToken);

  return res.status(HTTP_CODE.NO_CONTENT).send();
};

const refreshToken = async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);

  res.status(200).send({ ...tokens });
};

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);

  return res
    .status(HTTP_CODE.OK)
    .send({ message: 'Password is changed successfully' });
};

const forgotPassword = async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

  return res.status(HTTP_CODE.NO_CONTENT).send();
};

const sendVerificationEmail = async (req, res) => {
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
};

const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.query.token);

  return res.status(HTTP_CODE.NO_CONTENT).send();
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
