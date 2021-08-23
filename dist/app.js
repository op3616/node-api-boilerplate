"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _errorHandle = require("./utils/errorHandle");

var _apiError = _interopRequireDefault(require("./utils/apiError"));

var _rateLimiter = _interopRequireDefault(require("./utils/rateLimiter"));

var _constants = require("./config/constants");

var _config = _interopRequireDefault(require("./config"));

var _morgan = _interopRequireDefault(require("./config/morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

if (_config["default"].env !== 'test') {
  app.use(_morgan["default"].successHandler);
  app.use(_morgan["default"].errorHandler);
} // set security HTTP headers


app.use((0, _helmet["default"])()); // parse json request body

app.use(_express["default"].json()); // parse urlencoded request body

app.use(_express["default"].urlencoded({
  extended: true
})); // hide framework name

app.disable('X-Powered-By'); // gzip compression

app.use((0, _compression["default"])()); // enable cors

app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])()); // limit repeated failed requests to auth endpoints

if (_config["default"].env === 'production') {
  app.use('/v1/auth', _rateLimiter["default"]);
} // route demo


app.get('/', function (req, res) {
  res.send('hello world');
}); // send back a 404 error for any unknown api request

app.use(function (req, res, next) {
  next(new _apiError["default"](_constants.HTTP_CODE.NOT_FOUND, 'Not found'));
}); // convert error to ApiError, if needed

app.use(_errorHandle.errorConverter); // handle error

app.use(_errorHandle.errorHandler);
var _default = app;
exports["default"] = _default;