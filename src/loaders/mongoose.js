import mongoose from 'mongoose';

import config from '../config';
import logger from '../config/logger';

const mongooseLoader = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);

  const db = mongoose.connection;
  db.on('error', () =>
    logger.error('Please start service mongodb before run mongo loader')
  );
  db.once('open', () => {
    // we're connected!
  });
};

export default mongooseLoader;
