import mongoose from 'mongoose';
import faker from 'faker';

import User from '../../src/models/User';
import hashPassword from '../utils/hashPassword';

const password = 'password1';

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(
    users.map((user) => ({
      ...user,
      password: hashPassword(password),
    }))
  );
};

export { userOne, userTwo, admin, insertUsers };
