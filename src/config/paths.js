import path from 'path';
import fs from 'fs';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['js', 'ts', 'json'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((item) =>
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.existsSync(resolveFn(`${filePath}.${item}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appPublic: resolveApp('src/public'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appSrc: resolveApp('src'),
};
