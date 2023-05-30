import type { GetMongooseScheme } from '~/shared/lib/ts/index.js';

import type { configModel } from '../model/index.js';

export type Config = GetMongooseScheme<typeof configModel>;
