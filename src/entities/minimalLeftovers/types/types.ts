import type { GetMongooseScheme } from '~/shared/lib/ts';

import type { minimalLeftoversModel } from '../model';

export type MinimalLeftover = GetMongooseScheme<typeof minimalLeftoversModel>;

export type MinimalLeftoversList = Array<MinimalLeftover>;

export type MinimalLeftoverProduct = MinimalLeftover['products'][number];
