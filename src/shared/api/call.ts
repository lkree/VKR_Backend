import fetch from 'node-fetch';

import { isArray, isObject, toCamelCase } from '~/shared/lib/helpers/index.js';

export const call = <T>(resultType: 'text' | 'json', ...props: Parameters<typeof fetch>): Promise<T> =>
  fetch(...props)
    .then(d => d[resultType]())
    .then(
      result =>
        (resultType === 'text' ? result : isObject(result) || isArray(result) ? toCamelCase(result) : result) as T
    );
