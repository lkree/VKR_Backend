import type { GetMongooseScheme } from '~/shared/lib/ts';

import type { tokenModel } from '../model';

export type Tokens = GetMongooseScheme<typeof tokenModel>;
