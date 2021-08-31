import expressLoader from './express';
import mongooseLoader from './mongoose';
import mailTransportLoader from './mailer';

import logger from '../config/logger';

const appLoaders = async ({ expressApp }) => {
  await mongooseLoader();
  logger.info(`🔊 MongoDB Loaded`);

  await mailTransportLoader();
  logger.info(`🔊 Connected to email server`);

  await expressLoader({ app: expressApp });
  logger.info(`🔊 Express Loaded`);
};

export default appLoaders;
