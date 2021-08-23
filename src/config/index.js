import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import fs from 'fs';
import Joi from 'joi';

import paths from './paths';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: paths.dotenv });

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

const dotenvFiles = [
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
dotenvFiles.forEach((dotenvFile) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      })
    );
  }
});

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(8080),
  })
  .unknown();

const { value: envs, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envs.NODE_ENV,
  port: envs.PORT,
  mongoose: {
    url: envs.MONGODB_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envs.JWT_SECRET,
    accessExpirationMinutes: envs.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envs.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envs.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envs.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
