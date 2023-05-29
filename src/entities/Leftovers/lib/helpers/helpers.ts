import { ApiError } from '~/shared/lib/ApiError/index.js';
import { isObject } from '~/shared/lib/helpers/index.js';

import type { FileLeftovers, Leftover, ViewLeftover } from '../../types/index.js';

import { assertLeftover, assertLeftovers } from './typeGuards.js';

export const getData = (body: unknown, field: string) => {
  if (isObject(body) && field in body) return body[field];

  throw ApiError.BadRequest('Не переданы остатки');
};

export const getLeftover = (body: unknown) => {
  const leftover = getData(body, 'leftover');

  assertLeftover(leftover);

  return viewModelIntoDB(leftover);
};

export const getLeftovers = (body: unknown) => {
  const leftovers = getData(body, 'leftovers');

  assertLeftovers(leftovers);

  return leftovers.map(viewModelIntoDB);
};

export const viewModelIntoDB = (model: ViewLeftover): Leftover => ({
  cityName: model.cityName,
  leftovers: model.leftovers.map(l => ({
    nomenclature: l.Номенклатура,
    unit: l['Ед. изм.'],
    ...(l['Начальный остаток'] && { leftoverAtStart: l['Начальный остаток'] }),
    ...(l['Конечный остаток'] && { leftoverAtEnd: l['Конечный остаток'] }),
    ...(l['Артикул'] && { vendorCode: l['Артикул'] }),
    ...(l['Приход'] && { incoming: l['Приход'] }),
    ...(l['Расход'] && { consumption: l['Расход'] }),
  })),
});

export const dbModelIntoView = (model: Leftover): ViewLeftover => ({
  cityName: model.cityName,
  leftovers: model.leftovers.map(l => ({
    Номенклатура: l.nomenclature,
    'Ед. изм.': l.unit,
    ...(l.leftoverAtStart && { 'Начальный остаток': l.leftoverAtStart }),
    ...(l.leftoverAtEnd && { 'Конечный остаток': l.leftoverAtEnd }),
    ...(l.vendorCode && { Артикул: l.vendorCode }),
    ...(l.incoming && { Приход: l.incoming }),
    ...(l.consumption && { Расход: l.consumption }),
  })),
});

export const fileLeftoversToDB = (leftovers: FileLeftovers) =>
  Object.entries(leftovers).map(([key, value]) => viewModelIntoDB({ cityName: key, leftovers: value }));
