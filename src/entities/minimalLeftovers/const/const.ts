import { computePathWithDomain } from '~/shared/api';
import type { MethodsMap } from '~/shared/lib/ts';

import { minimalLeftoversController } from '../controller';

const computePath = computePathWithDomain('minimalLeftovers');

export const Methods: MethodsMap<typeof minimalLeftoversController> = {
  GetAll: computePath('getAll'),
  WriteAll: computePath('writeAll'),
  Write: computePath('write'),
  DeleteAll: computePath('deleteAll'),
  Delete: computePath('delete'),
};

export const NON_PRODUCT_LEFTOVER = 0;
