"use strict";

var _app = _interopRequireDefault(require("./app"));

var _logger = _interopRequireDefault(require("./config/logger"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function startApp() {
  _app["default"].listen(_config["default"].port, function () {
    _logger["default"].info("\uD83D\uDD0A Server on listening at http://localhost:".concat(_config["default"].port, " in ").concat(_config["default"].env, " mode"));
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