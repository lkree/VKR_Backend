import { computePathWithDomain } from '~/shared/api';
import { MethodsMap } from '~/shared/lib/ts';

import { citiesPrefixController } from '../controller';

const computePath = computePathWithDomain('citiesPrefix');

export const Methods: MethodsMap<typeof citiesPrefixController> = {
  Add: computePath('add'),
  Delete: computePath('delete'),
  GetAll: computePath('getAll'),
};
