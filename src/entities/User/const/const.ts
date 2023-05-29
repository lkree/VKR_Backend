import { computePathWithDomain } from '~/shared/api/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { userController } from '../controller/index.js';

const computePath = computePathWithDomain('user');

export const Methods: MethodsMap<typeof userController> = {
  Registration: computePath('registration'),
  Session: computePath('session'),
  Login: computePath('login'),
  Logout: computePath('logout'),
  Refresh: computePath('refresh'),
  GetAll: computePath('GetAll'),
};
