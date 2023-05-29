import { computeCityKey, computeProductName } from '~/entities/Transfer1cData/lib/helpers/index.js';

import { isArray, isEqual, isString } from '~/shared/lib/helpers/index.js';

import { CITY_ROW_NAME, SHARED_KEY } from '../const/index.js';
import { isCityKey } from '../lib/helpers/typeGuards.js';
import type { Cities, CitiesSettings } from '../types/index.js';

export const Transfer1cData = <T extends CitiesSettings>(
  data: Array<Record<string, string | number>>,
  citiesSettings: T
) => {
  if (!isArray(data)) return null;

  return Object.entries(
    data.reduce(
      (result, oneLineData) => {
        const productNameWithCity = oneLineData[CITY_ROW_NAME];

        if (!productNameWithCity || !isString(productNameWithCity)) return result;

        const cityKey = computeCityKey(productNameWithCity);
        const productName = computeProductName(productNameWithCity, cityKey);
        const resultData = { ...oneLineData, [CITY_ROW_NAME]: productName };

        if (cityKey && isCityKey(cityKey, citiesSettings)) {
          if (!(citiesSettings[cityKey]! in result)) result[citiesSettings[cityKey]!] = [];

          if (!result[citiesSettings[cityKey]!]!.find(it => isEqual(it, resultData))) {
            result[citiesSettings[cityKey]!]!.push(resultData);
          }
        } else {
          if (!result[SHARED_KEY]) result[SHARED_KEY] = [];

          if (!result[SHARED_KEY].find(it => it[CITY_ROW_NAME] === resultData[CITY_ROW_NAME])) {
            result[SHARED_KEY].push(resultData);
          }
        }

        return result;
      },
      Object.values(citiesSettings).reduce((r, v) => {
        r[v] = [];

        return r;
      }, {} as Record<Cities | string, Array<Record<string, string>>>)
    )
  ).reduce((r, [key, value]) => ({ ...r, ...(value.length && { [key]: value }) }), {});
};

// export const Transfer1cData = () => {
//   return void 0;
// };
