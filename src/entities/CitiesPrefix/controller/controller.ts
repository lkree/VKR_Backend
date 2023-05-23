import { RequestParamHandler } from 'express-serve-static-core';

import { citiesPrefixService } from '../api/index.js';

type IPrefixController = { [Method in keyof typeof citiesPrefixService]: RequestParamHandler };

export const citiesPrefixController: IPrefixController = {
  add: async (req, res, next) => {
    try {
      const { cityName, cityPrefix } = req.body;

      return res.json(await citiesPrefixService.add(cityName, cityPrefix));
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { cityPrefix } = req.body;

      return res.json(await citiesPrefixService.delete(cityPrefix));
    } catch (e) {
      next(e);
    }
  },

  getAll: async (_, res, next) => {
    try {
      return res.json(await citiesPrefixService.getAll());
    } catch (e) {
      next(e);
    }
  },
};
