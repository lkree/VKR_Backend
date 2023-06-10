import type { RequestHandler } from 'express-serve-static-core';

import { tokenService } from '~/entities/Token';

import { AccessLevel } from '~/shared/const';
import { ApiError } from '~/shared/lib/ApiError';
import { isObject } from '~/shared/lib/helpers';

export const checkAdminMiddleware: RequestHandler = (req, _, next) => {
  try {
    const { accessToken } = req.cookies;

    const userData = tokenService.validateAccessToken(accessToken);

    if (!isObject(userData) || !('accessLevel' in userData) || userData.accessLevel !== AccessLevel.Admin) {
      return next(ApiError.NoAdminRightsError());
    }

    next();
  } catch (e) {
    next(ApiError.NoAdminRightsError());
  }
};
