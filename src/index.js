import express from 'express';

import logger from './config/logger';
import config from './config/secrets';

import appLoader from './loaders';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   * */
  await appLoader({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(
      `🔊 Server on listening at http://localhost:${config.port} in ${config.env} mode`
    );
  });

  const exitHandler = () => {
    if (app) {
      app.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (app) {
      app.close();
    }
  });
}

startServer();
