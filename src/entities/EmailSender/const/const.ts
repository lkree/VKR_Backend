import { computePathWithDomain } from '~/shared/api';
import type { MethodsMap } from '~/shared/lib/ts';

import { emailSenderController } from '../controller';

const computePath = computePathWithDomain('emailSender');

export const Methods: MethodsMap<typeof emailSenderController> = {
  SendTestEmail: computePath('sendTestEmail'),
};
