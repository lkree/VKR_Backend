import { computePathWithDomain } from '~/shared/api/index.js';
import { AccessLevel } from '~/shared/const/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import type { userController } from '../controller/index.js';

const computePath = computePathWithDomain('user');

export const Methods: MethodsMap<typeof userController> = {
  Registration: computePath('registration'),
  Session: computePath('session'),
  Login: computePath('login'),
  Logout: computePath('logout'),
  Refresh: computePath('refresh'),
  Update: computePath('update'),
  GetAll: computePath('GetAll'),
};

export const DEFAULT_CREATE_USER_LEVER = AccessLevel.User;
