import type { GetMongooseScheme } from '~/shared/lib/ts';

import type { userModel } from '../model';

export type DBUser = GetMongooseScheme<typeof userModel>;
export type FEUser = Omit<DBUser, 'password'>;
