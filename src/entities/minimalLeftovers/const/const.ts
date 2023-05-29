import { computePathWithDomain } from '~/shared/api/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { minimalLeftoversController } from '../controller/index.js';

const computePath = computePathWithDomain('minimalLeftovers');

export const Methods: MethodsMap<typeof minimalLeftoversController> = {
  GetAll: computePath('getAll'),
  WriteAll: computePath('writeAll'),
  Write: computePath('write'),
  DeleteAll: computePath('deleteAll'),
  Delete: computePath('delete'),
};

export const NON_PRODUCT_LEFTOVER = null;
