import passport from 'passport';

import { HTTP_CODE } from '../config/constants';
import { roleRights } from '../config/roles';
import ApiError from '../utils/apiError';

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(HTTP_CODE.UNAUTHORIZED, 'Please authenticate')
      );
    }

    req.userData = user;

    if (requiredRights.length) {
      // get all role rights from
      const userRights = roleRights.get(user.role);

      if (!Array.isArray(userRights)) {
        return reject(
          new ApiError(
            HTTP_CODE.INTERNAL_SERVER_ERROR,
            'User right must be an array'
          )
        );
      }

      // check if user has full authority
      const hasFullAuthority = userRights.some(
        (userRight) => userRight === 'all'
      );
      if (hasFullAuthority) {
        return resolve();
      }

      const hasRequiredRights = requiredRights.every((requireRight) =>
        userRights.includes(requireRight)
      );

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(HTTP_CODE.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
