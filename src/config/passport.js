import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import config from './secretKeys';
import { tokenTypes } from './constants';
import User from '../models/User';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }

    const userData = await User.findOne({ _id: payload.sub });

    if (!userData) {
      done(null, false);
    }

    done(null, userData);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
