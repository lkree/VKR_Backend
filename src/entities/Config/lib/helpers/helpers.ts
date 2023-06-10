import { FULL_VALUE } from '~/shared/lib/decorators';
import { isObject } from '~/shared/lib/helpers';

import type { Config } from '../../types';

const EMAIL_SETTINGS_FIELDS = ['password', 'port', 'secure', 'user', 'host'];

export const transformBDConfigToFE = (config: Config = {}) =>
  config?.emailSettings
    ? {
        user: config.emailSettings.user,
        port: config.emailSettings.port,
        secure: config.emailSettings.secure,
        host: config.emailSettings.host,
      }
    : {};

export const emailSettingsValidationObject = {
  [FULL_VALUE]: (d: unknown) => isObject(d) && Object.keys(d).some(k => EMAIL_SETTINGS_FIELDS.includes(k)),
};
