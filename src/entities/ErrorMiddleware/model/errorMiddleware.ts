import { ErrorRequestHandler } from 'express-serve-static-core';

import { ApiError } from '~/entities/ApiError/index.js';

export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof Error) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    console.log(err, 'err');

    return res.status(500).json({ message: 'Непредвиденная ошибка' });
  }

  return next();
};
