import User from '../models/User';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
export const createUser = async (userBody) => {
  return User.create(userBody);
};
