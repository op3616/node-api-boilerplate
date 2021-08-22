"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
_dotenv["default"].config({
  path: paths.dotenv
});

var NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

var dotenvFiles = [// Don't include `.env.local` for `test` environment
// since normally you expect tests to produce the same
// results for everyone
NODE_ENV !== 'test' && "".concat(paths.dotenv, ".local"), "".concat(paths.dotenv, ".").concat(NODE_ENV), paths.dotenv].filter(Boolean); // Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.

dotenvFiles.forEach(function (dotenvFile) {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(require('dotenv').config({
      path: dotenvFile
    }));
  }
});
var _default = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080
};
exports["default"] = _default;