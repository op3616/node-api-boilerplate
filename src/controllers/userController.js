import { HTTP_CODE } from '../config/constants';

export const getUsers = (req, res) => {
  return res.status(200).json({ message: 'No user here!!' });
};

export const validateFormExample = (req, res) => {
  const { name, age } = req.body;

  return res.status(HTTP_CODE.OK).json({ name, age });
};
