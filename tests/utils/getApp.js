import express from 'express';

import expressLoader from '../../src/loaders/express';

const getApp = () => {
  const app = express();

  expressLoader({ app });

  return app;
};

export default getApp;
