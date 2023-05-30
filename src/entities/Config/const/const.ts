import { computePathWithDomain } from '~/shared/api/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { configController } from '../controller/index.js';

const computePath = computePathWithDomain('config');

export const Methods: MethodsMap<typeof configController> = {
  Get: computePath('get'),
  Write: computePath('write'),
};
