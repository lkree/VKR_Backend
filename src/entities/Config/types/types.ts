import type { GetMongooseScheme } from '~/shared/lib/ts';

import type { configModel } from '../model';

export type Config = GetMongooseScheme<typeof configModel>;
