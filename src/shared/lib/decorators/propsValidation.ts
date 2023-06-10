import { ApiError } from '~/shared/lib/ApiError';
import { isObject } from '~/shared/lib/helpers';

import { FULL_VALUE } from './const';

export type ValidationObject = Record<string, (d: any) => boolean>;

export function propsValidation(
  assertObject: ValidationObject,
  data: unknown
): asserts data is { [key in keyof typeof assertObject]: unknown } {
  if (!isObject(data)) throw ApiError.BadRequest('не переданы аргументы');

  Object.entries(assertObject).forEach(([property, typeGuard]) => {
    if (!typeGuard(property === FULL_VALUE ? data : data[property])) {
      throw ApiError.BadRequest(
        `что-то не так с переданным аргументом ${property}. Он не прошёл проверку ${typeGuard.name}`
      );
    }
  });
}
