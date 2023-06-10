import { computePathWithDomain } from '~/shared/api';
import { AccessLevel } from '~/shared/const';
import type { MethodsMap } from '~/shared/lib/ts';

import type { userController } from '../controller';

const computePath = computePathWithDomain('user');

export const Methods: MethodsMap<typeof userController> = {
  Registration: computePath('registration'),
  Session: computePath('session'),
  Login: computePath('login'),
  Logout: computePath('logout'),
  Refresh: computePath('refresh'),
  Update: computePath('update'),
  Delete: computePath('delete'),
  GetAll: computePath('GetAll'),
};

export const DEFAULT_CREATE_USER_LEVER = AccessLevel.User;
