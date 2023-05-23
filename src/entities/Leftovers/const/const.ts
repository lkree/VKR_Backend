import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { leftoverController } from '../controller/index.js';

export const Methods: MethodsMap<typeof leftoverController> = {
  Add: '/add',
  Update: '/update',
  Recreate: '/recreate',
  DeleteOne: '/deleteOne',
  DeleteAll: '/deleteAll',
  GetAll: '/getAll',
};
