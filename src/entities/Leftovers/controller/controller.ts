import type { NextFunction, Request, Response } from 'express';

import { minimalLeftoversService } from '~/entities/MinimalLeftovers';
import type { FEUser } from '~/entities/User';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';
import { isArray, isObject } from '~/shared/lib/helpers';

import { leftoverService } from '../api';
import {
  assertLeftovers,
  transformBELeftoversListIntoFE,
  assertLeftover,
  transformBELeftoverIntoFE,
  transformFELeftoverIntoBE,
  transformFELeftoversListIntoBE,
} from '../lib/helpers';
import type { FileLeftoversList, Leftover } from '../types';

class LeftoverController extends BaseController implements Controller<typeof leftoverService> {
  @RequestPropsHandle({
    validate: [{ validationObject: { leftovers: isArray } }],
    assert: [{ assertObject: { leftovers: assertLeftovers } }],
    transform: {
      in: { leftovers: transformFELeftoversListIntoBE },
      out: transformBELeftoversListIntoFE,
    },
  })
  async create(req: Request, res: Response, __: NextFunction) {
    const { leftovers } = req.body;

    res.json(await Promise.all([leftoverService.create(leftovers), minimalLeftoversService._getAll()]));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { leftovers: isArray } }],
    assert: [{ assertObject: { leftovers: assertLeftovers } }],
    transform: {
      in: { leftovers: transformFELeftoversListIntoBE },
      out: transformBELeftoversListIntoFE,
    },
  })
  async writeAll(req: Request, res: Response, __: NextFunction) {
    const { leftovers } = req.body;

    res.json(await Promise.all([leftoverService.create(leftovers), minimalLeftoversService._getAll()]));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { leftover: isObject } }],
    assert: [{ assertObject: { leftover: assertLeftover } }],
    transform: {
      in: { leftover: transformFELeftoverIntoBE },
      out: transformBELeftoverIntoFE,
    },
  })
  async update(req: Request, res: Response, __: NextFunction) {
    const { leftover } = req.body as { leftover: Leftover };

    res.json(
      await Promise.all([
        leftoverService.update(leftover),
        minimalLeftoversService._get({ cityName: leftover.cityName }),
      ])
    );
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { leftovers: isArray } }],
    assert: [{ assertObject: { leftovers: assertLeftovers } }],
    transform: {
      in: { leftovers: transformFELeftoversListIntoBE },
      out: transformBELeftoversListIntoFE,
    },
  })
  async updateAll(req: Request, res: Response, __: NextFunction) {
    const { leftovers } = req.body;

    res.json(await Promise.all([leftoverService.updateAll(leftovers), minimalLeftoversService._getAll()]));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: { leftover: isObject } }],
    assert: [{ assertObject: { leftover: assertLeftover } }],
    transform: {
      in: { leftover: transformFELeftoverIntoBE },
      out: transformBELeftoversListIntoFE,
    },
  })
  async deleteOne(req: Request, res: Response, __: NextFunction) {
    const { leftover } = req.body;

    res.json(await Promise.all([leftoverService.deleteOne(leftover), minimalLeftoversService._getAll()]));
  }

  async deleteAll(_: Request, res: Response, __: NextFunction) {
    res.json(await leftoverService.deleteAll());
  }

  async getUniqueProducts(_: Request, res: Response, __: NextFunction) {
    res.json(await leftoverService.getUniqueProducts());
  }

  @RequestPropsHandle({ transform: { out: transformBELeftoversListIntoFE } })
  async getAll(req: Request, res: Response, __: NextFunction) {
    const city = (req as unknown as { user: FEUser }).user.cityBounding;

    res.json(await Promise.all([leftoverService.getAll(city), minimalLeftoversService._getAll()]));
  }

  _getAll() {
    return leftoverService.getAll();
  }

  async _getLeftoversWithOverdraft() {
    return leftoverService._getLeftoversWithOverdraft(await minimalLeftoversService._getAll());
  }

  _saveLeftoversFromFile(fileLeftoversList: FileLeftoversList) {
    return leftoverService._saveLeftoversFromFile(fileLeftoversList);
  }
}

export const leftoverController = new LeftoverController();
