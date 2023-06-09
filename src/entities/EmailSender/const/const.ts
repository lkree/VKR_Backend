import { computePathWithDomain } from '~/shared/api';
import type { MethodsMap } from '~/shared/lib/ts';

import { configController } from '../controller';

const computePath = computePathWithDomain('config');

export const Methods: MethodsMap<typeof configController> = {
  GetEmailSettings: computePath('getEmailSettings'),
  WriteEmailSettings: computePath('writeEmailSettings'),
};
