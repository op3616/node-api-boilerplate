import express from 'express';

import expressLoader from '../../src/loaders/expressApp';

const getApp = () => {
  const app = express();

  expressLoader({ app });

  return app;
};

export default getApp;
