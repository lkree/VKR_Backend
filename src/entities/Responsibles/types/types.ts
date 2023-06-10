import type { responsiblePersonsModel } from '~/entities/Responsibles/model';

import type { GetMongooseScheme } from '~/shared/lib/ts';

export type ResponsiblePerson = GetMongooseScheme<typeof responsiblePersonsModel>;

export interface ResponsiblePersonWithPassword extends ResponsiblePerson {
  password?: string;
}
