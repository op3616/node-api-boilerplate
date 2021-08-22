"use strict";

var _app = _interopRequireDefault(require("./app"));

var _logger = _interopRequireDefault(require("./config/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function startApp() {
  _app["default"].listen(config.port, function () {
    _logger["default"].info("Listening to port ".concat(config.port));
  });

  var exitHandler = function exitHandler() {
    if (_app["default"]) {
      _app["default"].close(function () {
        _logger["default"].info('Server closed');

        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  var unexpectedErrorHandler = function unexpectedErrorHandler(error) {
    _logger["default"].error(error);

    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  process.on('SIGTERM', function () {
    _logger["default"].info('SIGTERM received');

    if (_app["default"]) {
      _app["default"].close();
    }
  });
}

startApp();