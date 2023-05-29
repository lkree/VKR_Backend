import type { RequestParamHandler } from 'express-serve-static-core';

import { RequestDataFields } from '~/shared/lib/decorators/const.js';

import { assert, AssertObject } from './asserts.js';
import { propsValidation, ValidationObject } from './propsValidation.js';

type DecoratorCallback = (
  this: any,
  originalFn: RequestParamHandler,
  ...Parameters: Parameters<RequestParamHandler>
) => Promise<unknown>;

const makeDecorator = <T extends DecoratorCallback>(decoratorCallback: T) => {
  return (_: any, __: string, descriptor?: PropertyDescriptor) => {
    if (!descriptor) return;

    const originalFunction: RequestParamHandler = descriptor.value;

    descriptor.value = async function (this: any, ...reqProps) {
      return await decoratorCallback.call(this, originalFunction, ...reqProps);
    } as RequestParamHandler;
  };
};

export const RequestPropsValidation = (
  validationObject: ValidationObject,
  fieldToExecuteData: RequestDataFields = RequestDataFields.Body
) =>
  makeDecorator(async function (originalFn, req, res, next, ...rest) {
    propsValidation(validationObject, req[fieldToExecuteData]);

    return await originalFn.call(this, req, res, next, ...rest);
  });

export const RequestAssert = (
  assertObject: AssertObject,
  fieldToExecuteData: RequestDataFields = RequestDataFields.Body
) =>
  makeDecorator(async function (originalFn, req, res, next, ...rest) {
    assert(assertObject, req[fieldToExecuteData]);

    return await originalFn.call(this, req, res, next, ...rest);
  });
