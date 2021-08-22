"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.errorConverter = void 0;

var _constants = require("../config/constants");

var _apiError = _interopRequireDefault(require("./apiError"));

var _logger = _interopRequireDefault(require("../config/logger"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// if you installed mongoose, please import dependency into file and remove next line
var mongoose = false;

var errorConverter = function errorConverter(err, req, res, next) {
  var error = err;

  if (!(error instanceof _apiError["default"])) {
    var statusCode = error.statusCode || mongoose && error instanceof mongoose.Error ? _constants.HTTP_CODE.BAD_REQUEST : _constants.HTTP_CODE.INTERNAL_SERVER_ERROR;
    var message = error.message || _constants.HTTP_CODE[statusCode];
    error = new _apiError["default"](statusCode, message, false, err.stack);
  }

  next(error);
};

exports.errorConverter = errorConverter;

var errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = err.statusCode,
      message = err.message;

  if (_config["default"].env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  var response = _objectSpread({
    code: statusCode,
    message: message
  }, _config["default"].env === 'development' && {
    stack: err.stack
  });

  if (_config["default"].env === 'development') {
    _logger["default"].error(err);
  }

  res.status(statusCode).send(response);
};

exports.errorHandler = errorHandler;