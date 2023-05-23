import type { noop } from 'lodash';

export type noop = typeof noop;
export type Entries<T extends object> = [keyof T, T[keyof T]][];
export type AnyFunction = (...props: any[]) => any;
export type Nullable<T> = T | null;
export type ValidateString<T> = T extends string ? T : '';

export type MethodsMap<T extends Record<string, any>> = {
  [Method in Capitalize<ValidateString<keyof T>>]: string;
};
