interface viewLeftoverFilling {
  Номенклатура: string;
  'Ед. изм.': string;
  Артикул?: string;
  Приход?: number;
  Расход?: number;
  'Начальный остаток'?: number;
  'Конечный остаток'?: number;
}

export interface Leftover {
  cityName: string;
  leftovers: Array<{
    nomenclature: string;
    unit: string;
    vendorCode?: string;
    incoming?: number;
    consumption?: number;
    leftoverAtStart?: number;
    leftoverAtEnd?: number;
  }>;
}

export type Leftovers = Array<Leftover>;

export interface ViewLeftover {
  cityName: string;
  leftovers: Array<viewLeftoverFilling>;
}

export interface FileLeftovers {
  [cityName: string]: Array<viewLeftoverFilling>;
}
