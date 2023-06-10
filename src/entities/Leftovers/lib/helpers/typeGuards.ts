import { ApiError } from '~/shared/lib/ApiError';
import { isArray, isObject } from '~/shared/lib/helpers';

import type { LeftoverFE, LeftoversFEList } from '../../types';

const DEFAULT_ERROR = 'В переданных остатках есть ошибки';

export function assertLeftover(d: unknown): asserts d is LeftoverFE {
  if (isObject(d) && 'cityName' in d && 'leftovers' in d) {
    const { leftovers } = d;

    if (isArray(leftovers)) {
      const leftover = leftovers[0];

      if (isObject(leftover) && 'nomenclature' in leftover) {
        return;
      }
    }
  }

  throw ApiError.BadRequest(DEFAULT_ERROR);
}

export function assertLeftovers(d: unknown): asserts d is LeftoversFEList {
  if (isArray(d)) {
    d.forEach(assertLeftover);
    return;
  }

  throw ApiError.BadRequest(DEFAULT_ERROR);
}
