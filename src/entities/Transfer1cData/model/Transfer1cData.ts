import { computeCityKey, computeProductName } from '~/entities/Transfer1cData/lib/helpers/index.js';

import { isArray, isString } from '~/shared/lib/helpers/index.js';

import { CITIES_SETTINGS, CITY_ROW_NAME } from '../const/index.js';
import { isCityKey } from '../lib/helpers/typeGuards.js';
import type { Cities } from '../types/index.js';

export const Transfer1cData = (data: Array<Record<string, string | number>>) => {
  if (!isArray(data)) return null;

  return data.reduce(
    (result, oneLineData) => {
      const productNameWithCity = oneLineData[CITY_ROW_NAME];

      if (!productNameWithCity || !isString(productNameWithCity)) return result;

      const cityKey = computeCityKey(productNameWithCity);
      const productName = computeProductName(productNameWithCity, cityKey);
      const resultData = { ...oneLineData, [CITY_ROW_NAME]: productName };

      if (cityKey) {
        if (isCityKey(cityKey)) {
          result[CITIES_SETTINGS[cityKey]]!.push(resultData);
        } else {
          if (result[cityKey]) result[cityKey]!.push(resultData);
          else result[cityKey] = [resultData];
        }
      } else {
        result[CITIES_SETTINGS.Общее]!.push(resultData);
      }

      return result;
    },
    Object.values(CITIES_SETTINGS).reduce((r, v) => {
      r[v] = [];

      return r;
    }, {} as Record<Cities | string, Array<Record<string, string>>>)
  );
};

// export const Transfer1cData = () => {
//   return void 0;
// };
