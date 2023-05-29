import { ApiError } from '~/shared/lib/ApiError/index.js';
import { isArray, isObject } from '~/shared/lib/helpers/index.js';

import type { ViewLeftover } from '../../types/index.js';

const DEFAULT_ERROR = 'В переданных остатках есть ошибки';

export function assertLeftover(d: unknown): asserts d is ViewLeftover {
  if (isObject(d) && 'cityName' in d && 'leftovers' in d) {
    const { leftovers } = d;

    if (isArray(leftovers)) {
      const leftover = leftovers[0];

      if (isObject(leftover) && 'Номенклатура' in leftover && 'Ед. изм.' in leftover) {
        return;
      }
    }
  }

  throw ApiError.BadRequest(DEFAULT_ERROR);
}

export function assertLeftovers(d: unknown): asserts d is Array<ViewLeftover> {
  if (isArray(d)) {
    d.forEach(assertLeftover);
    return;
  }

  throw ApiError.BadRequest(DEFAULT_ERROR);
}
