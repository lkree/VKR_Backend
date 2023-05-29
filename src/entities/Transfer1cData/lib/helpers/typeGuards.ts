import { isString } from '~/shared/lib/helpers/index.js';

import type { CitiesSettings } from '../../types/index.js';

export const isCityKey = <T extends CitiesSettings>(v: unknown, citiesSettings: T): v is keyof T =>
  Boolean(v && isString(v) && v in citiesSettings);
