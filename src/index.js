import app from './app';
import logger from './config/logger';
import config from './config';

function startApp() {
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

startApp();
