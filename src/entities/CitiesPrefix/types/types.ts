import type { GetMongooseScheme } from '~/shared/lib/ts';

import type { citiesPrefixModel } from '../model';

export type CitiesPrefix = GetMongooseScheme<typeof citiesPrefixModel>;
