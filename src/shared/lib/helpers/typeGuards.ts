export const isObject = <T>(value: T): value is Record<any, any> =>
  Boolean(Boolean(value) && typeof value === 'object' && !Array.isArray(value));

export const isArray = (value: unknown): value is Array<unknown> => Boolean(value && Array.isArray(value));

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isPrimitive = (value: unknown): value is number | string | boolean =>
  ['boolean', 'number', 'string'].includes(typeof value);
