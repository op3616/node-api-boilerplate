import moment from 'moment';

import config from '../../src/config';
import { tokenTypes } from '../../src/config/constants';
import * as tokenService from '../../src/services/tokenService';
import { userOne, admin } from './userFixture';

const accessTokenExpires = moment().add(
  config.jwt.accessExpirationMinutes,
  'minutes'
);
const userOneAccessToken = tokenService.generateToken(
  userOne._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);
const adminAccessToken = tokenService.generateToken(
  admin._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);

export { userOneAccessToken, adminAccessToken };
