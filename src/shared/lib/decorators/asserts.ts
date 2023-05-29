import { ApiError } from '~/shared/lib/ApiError/index.js';
import { isObject } from '~/shared/lib/helpers/index.js';

import { FULL_VALUE } from './const.js';

export type AssertObject = Record<string, (d: any) => void>;

export function assert(
  assertObject: AssertObject,
  data: unknown
): asserts data is { [key in keyof typeof assertObject]: unknown } {
  if (!isObject(data)) throw ApiError.BadRequest('не переданы аргументы');

  Object.entries(assertObject).forEach(([property, typeGuard]) =>
    typeGuard(property === FULL_VALUE ? data : data[property])
  );
}
