import type { Nullable } from '~/shared/lib/ts/index.js';

export interface MinimalLeftovers {
  cityName: string;
  products: Array<{ name: string; minimalLeftover?: Nullable<number>; orderingCount?: Nullable<number> }>;
}

export type MinimalLeftoversArray = Array<MinimalLeftovers>;