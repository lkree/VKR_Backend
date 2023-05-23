import express, { Express, RequestHandler } from 'express';
import * as fs from 'fs';
import lodash from 'lodash';
import path from 'path';

import { NUMBER_SEPARATOR } from '~/shared/const/index.js';

import { isPrimitive, isObject, isArray, isString, isNumber } from './typeGuards.js';

type Value<T> = T extends boolean | number | string
  ? T
  : T extends unknown[] | Record<string, any>
  ? T[keyof T]
  : never;

type ReturnValue<T, K> = T extends boolean | number | string
  ? K
  : T extends unknown[] | Record<string, any>
  ? { [Key in keyof T]: K }
  : never;

export const forEachValue = <T, K extends (value: Value<T>) => any>(
  data: T,
  callback: K
): ReturnValue<T, ReturnType<K>> =>
  isPrimitive(data)
    ? (callback(data as Value<T>) as ReturnValue<T, ReturnType<K>>)
    : Object.entries(data as object).reduce((r, [name, value]) => {
        r[name as keyof typeof r] = isObject(value)
          ? forEachValue(value, callback)
          : isArray(value)
          ? value.map(c => forEachValue(c, callback))
          : callback(value as Value<T>);

        return r;
      }, data as ReturnValue<T, ReturnType<K>>);

export const forEachKey = <T extends Record<string, any>>(
  data: T,
  callback: (key: string) => string
): Record<ReturnType<typeof callback>, T[keyof T]> =>
  Object.entries(data).reduce((r, [name, value]) => {
    r[callback(name)] = isObject(value) || isArray(value) ? forEachKey(value, callback) : value;

    return r;
  }, (isObject(data) ? {} : []) as Record<ReturnType<typeof callback>, T[keyof T]>);

export const deepClone = <T>(d: T): T => JSON.parse(JSON.stringify(d));

export const computeWebSocketSendData = (d: string | number | boolean | object | symbol | []) => JSON.stringify(d);

export const computeDirName = (relativePath: string) => path.resolve(path.dirname('.') + relativePath);

export const loadJSON = <T>(relativePath: string): T =>
  JSON.parse(String(fs.readFileSync(computeDirName(relativePath))));

const baseRoutingHandler =
  (entryPoint: string): RequestHandler =>
  (_, res) =>
    res.sendFile(entryPoint);

export const prepareBaseRouting = (app: Express) => {
  const uris = ['/', '/login', '/admin', '/logout'];
  const baseRoute = baseRoutingHandler(computeDirName('/dist/index.html'));

  app.use(express.static(computeDirName('/assets')));
  app.use(express.static(computeDirName('/dist')));

  uris.forEach(uri => app.get(uri, baseRoute));
};

// todo whitespaces or another characters
export const removeWhiteSpaces = (s: string) => [...s].filter(c => c.trim()).join('');

export const computeIntegerFromString = (s: unknown) => {
  if (isNumber(s)) return s;
  if (!isString(s)) return null;

  const [firstString, secondString] = s.split(NUMBER_SEPARATOR);

  if (!firstString || !secondString) return s;

  const firstPart = +removeWhiteSpaces(firstString);
  const secondPart = +removeWhiteSpaces(secondString);

  if (isFinite(firstPart) && isFinite(secondPart)) return firstPart + secondPart / +`1e${secondString.length}`;

  return s;
};

export const transformObjectWithStringsToNumbers = (d: Record<string, any>) =>
  forEachValue(d, value => (isString(value) ? computeIntegerFromString(value) : value));

export const toSnakeCase = <T extends Record<string, any>>(data: T): T => forEachKey(data, lodash.snakeCase) as T;

export const toCamelCase = <T extends Record<string, any>>(data: T): T => forEachKey(data, lodash.camelCase) as T;
