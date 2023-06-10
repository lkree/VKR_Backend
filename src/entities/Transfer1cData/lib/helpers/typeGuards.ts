import { isString } from '~/shared/lib/helpers';

import type { CitiesSettings } from '../../types';

export const isCityKey = <T extends CitiesSettings>(v: unknown, citiesSettings: T): v is keyof T =>
  Boolean(v && isString(v) && v in citiesSettings);
