import type { Leftovers } from '~/entities/Leftovers/types/index.js';

import { ApiError } from '~/shared/lib/ApiError/index.js';
import { isObject } from '~/shared/lib/helpers/index.js';

import { NON_PRODUCT_LEFTOVER } from '../../const/index.js';
import type { MinimalLeftoversArray } from '../../types/index.js';

const isCitiesProductsLeftoversArray = (d: Array<unknown>) => {
  if (!d.some(isObject)) throw ApiError.BadRequest('один из cityProductsLeftovers не объект');
};

export const minimalLeftoversArrayAssertObject = { minimalLeftoversArray: isCitiesProductsLeftoversArray };
export const minimalLeftoversValidationObject = { minimalLeftovers: isObject };

export const leftoversIntoMinimalLeftovers = (leftovers: Leftovers): MinimalLeftoversArray =>
  leftovers.map(leftover => ({
    cityName: leftover.cityName,
    products: leftover.leftovers.map(l => ({
      name: l.nomenclature,
      minimalLeftover: NON_PRODUCT_LEFTOVER,
      orderingCount: NON_PRODUCT_LEFTOVER,
    })),
  }));

export const assignMinimalLeftovers = (oldOne: MinimalLeftoversArray, newOne: MinimalLeftoversArray) =>
  newOne.reduce((result, newItem) => {
    const oldItem = result.find(it => it.cityName === newItem.cityName);

    if (oldItem) {
      oldItem.products = newItem.products.reduce((r, newProduct) => {
        const oldProduct = r.find(it => it.name === newProduct.name);

        if (!oldProduct) r.push(newProduct);

        return r;
      }, oldItem.products);
    } else {
      result.push(newItem);
    }

    return result;
  }, oldOne);
