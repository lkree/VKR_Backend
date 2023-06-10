import type { RequestParamHandler } from 'express-serve-static-core';

import { DEFAULT_MESSAGE_ERROR } from '~/entities/ErrorMiddleware';

import { isObject } from '~/shared/lib/helpers';

import { assert, AssertObject } from './asserts';
import { DEFAULT_FIELD_TO_DATA_EXECUTE, RequestDataFields } from './const';
import { propsValidation, ValidationObject } from './propsValidation';

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

interface Settings {
  assert?: Array<{
    assertObject: AssertObject;
    fieldToExecuteData?: RequestDataFields;
  }>;
  validate?: Array<{
    validationObject: ValidationObject;
    fieldToExecuteData?: RequestDataFields;
  }>;
  transform?: {
    in?: Record<string, (d: any) => void>;
    out?: (d: any) => any;
  };
}

export const RequestPropsHandle = (settings: Settings) =>
  makeDecorator(async function (originalFn, req, res, next, ...rest) {
    if (settings.validate) {
      settings.validate.forEach(({ validationObject, fieldToExecuteData = DEFAULT_FIELD_TO_DATA_EXECUTE }) =>
        propsValidation(validationObject, req[fieldToExecuteData])
      );
    }
    if (settings.assert) {
      settings.assert.forEach(({ assertObject, fieldToExecuteData = DEFAULT_FIELD_TO_DATA_EXECUTE }) =>
        assert(assertObject, req[fieldToExecuteData])
      );
    }
    if (settings.transform) {
      if (settings.transform.in) {
        Object.entries(settings.transform.in).forEach(([dataKey, dataTransformator]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          req.body[dataKey] = dataTransformator(req.body[dataKey]);
        });
      }
      if (settings.transform.out) {
        const resJsonFn = res.json;

        res.json = function (data: unknown) {
          if (isObject(data) && data.message && data.message === DEFAULT_MESSAGE_ERROR)
            return resJsonFn.call(this, data);

          return resJsonFn.call(this, settings.transform!.out!(data));
        };
      }
    }

    return await originalFn.call(this, req, res, next, ...rest);
  });
