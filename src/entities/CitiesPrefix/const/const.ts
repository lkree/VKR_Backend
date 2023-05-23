import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { citiesPrefixController } from '../controller/index.js';

export const Methods: MethodsMap<typeof citiesPrefixController> = {
  Add: '/add',
  Delete: '/delete',
  GetAll: '/getAll',
};
