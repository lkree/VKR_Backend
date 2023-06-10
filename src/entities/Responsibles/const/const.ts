import { computePathWithDomain } from '~/shared/api';
import type { MethodsMap } from '~/shared/lib/ts';

import { responsiblePersonsController } from '../controller';

const computePath = computePathWithDomain('responsiblePersons');

export const Methods: MethodsMap<typeof responsiblePersonsController> = {
  GetAll: computePath('getAll'),
  Write: computePath('write'),
};
