import mongoose from 'mongoose';
import logger from '../config/logger';
import config from '../config/secretKeys';

const mongooseLoader = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  } catch (error) {
    logger.error(`Failed to connect to MongoDB - ${error.message}`);
    throw new Error(`Failed to connect to MongoDB`);
  }
};

export default mongooseLoader;
