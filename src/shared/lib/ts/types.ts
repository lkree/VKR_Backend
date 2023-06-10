import type { noop } from 'lodash';
import type { Model } from 'mongoose';

export type noop = typeof noop;
export type Entries<T extends object> = [keyof T, T[keyof T]][];
export type AnyFunction = (...props: any[]) => any;
export type Nullable<T> = T | null;
export type Voidable<T> = T | undefined;
export type ValidateString<T> = T extends string ? T : '';
export type ValidateMethodName<T> = T extends `_${infer S}` ? (S extends string ? never : T) : T;

export type GetMongooseScheme<T> = T extends Model<infer S> ? S : never;

export type MethodsMap<T extends Record<string, any>> = {
  [Method in Capitalize<ValidateMethodName<ValidateString<keyof T>>>]: string;
};
