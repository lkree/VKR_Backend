import { computePathWithDomain } from '~/shared/api';
import type { MethodsMap } from '~/shared/lib/ts';

import { leftoverController } from '../controller';

const computePath = computePathWithDomain('leftovers');

export const Methods: MethodsMap<typeof leftoverController> = {
  Create: computePath('create'),
  Update: computePath('update'),
  UpdateAll: computePath('updateAll'),
  WriteAll: computePath('writeAll'),
  DeleteOne: computePath('deleteOne'),
  DeleteAll: computePath('deleteAll'),
  GetUniqueProducts: computePath('getUniqueProducts'),
  GetAll: computePath('getAll'),
};

export const BASE_ORDERED_COUNT = 0;

export const MINIMAL_LEFTOVER_AT_END = 0;
