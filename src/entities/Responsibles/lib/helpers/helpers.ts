import { alphabeticalSort } from '~/shared/lib/helpers';

import type { ResponsiblePerson } from '../../types';

export const transformDBIntoFE = ({ cityName, accountEmail, notifyEmail }: ResponsiblePerson) => ({
  cityName,
  notifyEmail,
  accountEmail,
});

export const transformDBArrayIntoFE = (responsiblePersonArray: Array<ResponsiblePerson>) =>
  responsiblePersonArray.map(transformDBIntoFE).sort((a, b) => alphabeticalSort(a.cityName, b.cityName));
