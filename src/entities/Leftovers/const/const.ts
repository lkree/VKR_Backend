import { computePathWithDomain } from '~/shared/api/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { leftoverController } from '../controller/index.js';

const computePath = computePathWithDomain('leftovers');

export const Methods: MethodsMap<typeof leftoverController> = {
  Add: computePath('add'),
  Update: computePath('update'),
  WriteAll: computePath('writeAll'),
  DeleteOne: computePath('deleteOne'),
  DeleteAll: computePath('deleteAll'),
  GetUniqueProducts: computePath('getUniqueProducts'),
  GetAll: computePath('getAll'),
};
