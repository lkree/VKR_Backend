import { computePathWithDomain } from '~/shared/api/index.js';
import { MethodsMap } from '~/shared/lib/ts/index.js';

import { citiesPrefixController } from '../controller/index.js';

const computePath = computePathWithDomain('citiesPrefix');

export const Methods: MethodsMap<typeof citiesPrefixController> = {
  Add: computePath('add'),
  Delete: computePath('delete'),
  GetAll: computePath('getAll'),
};
