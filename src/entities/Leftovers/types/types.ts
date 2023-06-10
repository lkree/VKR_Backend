import { GetMongooseScheme } from '~/shared/lib/ts';

import type { leftoversModel } from '../model';

export type LeftoversList = Array<GetMongooseScheme<typeof leftoversModel>>;

export type Leftover = LeftoversList[number];

export type LeftoverFE = {
  cityName: Leftover['cityName'];
  leftovers: Array<
    Pick<Leftover['leftovers'][number], 'nomenclature' | 'leftoverAtEnd' | 'orderedCount' | 'unit'> & {
      haveToOrder: number;
    }
  >;
};

export type LeftoversFEList = Array<LeftoverFE>;

export interface FileLeftoverFilling {
  Номенклатура: string;
  'Ед. изм.': string;
  Артикул?: string;
  Приход?: number;
  Расход?: number;
  'Начальный остаток'?: number;
  'Конечный остаток'?: number;
}

export interface FileLeftoversList {
  [cityName: string]: Array<FileLeftoverFilling>;
}

export type Overdraft = Pick<LeftoverFE['leftovers'][number], 'nomenclature' | 'haveToOrder' | 'unit'>;

export type OverdraftList = Array<Overdraft>;

export interface LeftoversOverdraft {
  cityName: string;
  overdraftList: OverdraftList;
}

export type LeftoversOverdraftList = Array<LeftoversOverdraft>;
