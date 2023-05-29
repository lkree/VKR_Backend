import type { RequestParamHandler } from 'express-serve-static-core';

import type { ValidateMethodName } from '~/shared/lib/ts/index.js';

const handler = {
  get: <T extends Record<string, (...props: Array<any>) => any>>(target: T, prop: keyof T) =>
    async function (this: any, req, res, next, ...rest) {
      try {
        const fn = target[prop];

        if (fn !== undefined) return await fn.call(this, req, res, next, ...rest);
      } catch (e) {
        if (next && typeof next === 'function') next(e);
        else console.log(e);
      }
    } as RequestParamHandler,
};

export type Controller<T extends Record<string, any>> = Record<ValidateMethodName<keyof T>, RequestParamHandler>;

abstract class AbstractController {}

export const BaseController = function (this: AbstractController) {
  return new Proxy(this, handler);
} as unknown as new () => AbstractController;
