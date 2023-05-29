import { FULL_VALUE } from '~/shared/lib/decorators/index.js';
import { isObject, isString } from '~/shared/lib/helpers/index.js';

export const emailPasswordValidationObject = { email: isString, password: isString };
export const accessTokenValidationObject = { [FULL_VALUE]: isObject };
export const refreshTokenValidationObject = { [FULL_VALUE]: isObject };
