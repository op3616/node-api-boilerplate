import bcrypt from 'bcrypt';

import User from '../models/User';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createUser = async (userBody) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userBody.password, salt);

  return User.create({ ...userBody, password: hash });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<User>}
 */
export const getUserById = async (id) => {
  return User.findById(id);
};
