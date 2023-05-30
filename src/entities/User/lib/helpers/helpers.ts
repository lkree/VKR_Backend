import { userModel } from '~/entities/User/index.js';

import { FULL_VALUE } from '~/shared/lib/decorators/index.js';
import { isObject, isString } from '~/shared/lib/helpers/index.js';
import type { GetMongooseScheme } from '~/shared/lib/ts/index.js';

export const emailPasswordValidationObject = { email: isString, password: isString };
export const accessTokenValidationObject = { [FULL_VALUE]: isObject };
export const refreshTokenValidationObject = { [FULL_VALUE]: isObject };

export const computeUserForFE = (user: GetMongooseScheme<typeof userModel>) => ({
  email: user.email,
  accessLevel: user.accessLevel,
  emailForMailing: user.emailForMailings,
});
