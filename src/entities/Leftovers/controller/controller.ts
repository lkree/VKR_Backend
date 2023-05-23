import type { RequestParamHandler } from 'express-serve-static-core';

import { leftoverService } from '../api/index.js';
import { dbModelIntoView, getLeftover, getLeftovers } from '../lib/helpers/index.js';
import type { Leftovers } from '../types/index.js';

type IPrefixController = { [Method in keyof typeof leftoverService]: RequestParamHandler };

const transformDBIntoView = (leftovers: Promise<Leftovers>) => leftovers.then(d => d.map(dbModelIntoView));

export const leftoverController: IPrefixController = {
  add: async (req, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.add(getLeftovers(req.body))));
    } catch (e) {
      next(e);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.deleteOne(getLeftover(req.body))));
    } catch (e) {
      next(e);
    }
  },

  recreate: async (req, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.recreate(getLeftovers(req.body))));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.update(getLeftovers(req.body))));
    } catch (e) {
      next(e);
    }
  },

  deleteAll: async (_, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.deleteAll()));
    } catch (e) {
      next(e);
    }
  },

  getAll: async (_, res, next) => {
    try {
      return res.json(await transformDBIntoView(leftoverService.getAll()));
    } catch (e) {
      next(e);
    }
  },
};
