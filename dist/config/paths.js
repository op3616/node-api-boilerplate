"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var appDirectory = _fs["default"].realpathSync(process.cwd());

var resolveApp = function resolveApp(relativePath) {
  return _path["default"].resolve(appDirectory, relativePath);
};

var moduleFileExtensions = ['js', 'ts', 'json']; // Resolve file paths in the same order as webpack

var resolveModule = function resolveModule(resolveFn, filePath) {
  var extension = moduleFileExtensions.find(function (extension) {
    return _fs["default"].existsSync(resolveFn("".concat(filePath, ".").concat(extension)));
  });

  if (extension) {
    return resolveFn("".concat(filePath, ".").concat(extension));
  }

  return resolveFn("".concat(filePath, ".js"));
};

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appPublic: resolveApp('src/public'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appSrc: resolveApp('src')
};