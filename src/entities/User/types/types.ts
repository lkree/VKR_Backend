import type { GetMongooseScheme } from '~/shared/lib/ts/index.js';

import type { userModel } from '../model/index.js';

export type User = GetMongooseScheme<typeof userModel>;
