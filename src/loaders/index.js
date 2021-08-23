import expressLoader from './express';
import mongooseLoader from './mongoose';

import logger from '../config/logger';

const appLoaders = async ({ expressApp }) => {
  await mongooseLoader();
  logger.info(`🔊 MongoDB Loaded`);

  await expressLoader({ app: expressApp });
  logger.info(`🔊 Express Loaded`);
};

export default appLoaders;
