export const compose =
  <T extends (...args: any[]) => any>(...fns: T[]) =>
  <K extends (...args: any[]) => any>(fn: K): K =>
    fns.reduce((result, current) => current(result), fn);
