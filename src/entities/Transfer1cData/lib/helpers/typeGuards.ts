import { CITIES_SETTINGS } from '~/entities/Transfer1cData/const/index.js';
import { isString } from '~/shared/lib/helpers/index.js';

import type { CitiesKeys } from '../../types/index.js';

export const isCityKey = (v: unknown): v is CitiesKeys => Boolean(v && isString(v) && v in CITIES_SETTINGS);
