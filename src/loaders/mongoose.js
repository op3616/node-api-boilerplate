import mongoose from 'mongoose';

import config from '../config';

const mongooseLoader = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
};

export default mongooseLoader;
