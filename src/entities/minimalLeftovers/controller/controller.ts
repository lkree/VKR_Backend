import type { NextFunction, Request, Response } from 'express';

import type { LeftoversList } from '~/entities/Leftovers';
import { leftoverService } from '~/entities/Leftovers';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';
import { isArray } from '~/shared/lib/helpers';

import { minimalLeftoversService } from '../api';
import {
  assignMinimalLeftovers,
  leftoversIntoMinimalLeftovers,
  minimalLeftoversArrayAssertObject,
  minimalLeftoversValidationObject,
  transformMinimalLeftoversDBIntoFE,
  transformMinimalLeftoversArrayDBIntoFE,
} from '../lib/helpers';
import type { MinimalLeftover } from '../types';

class MinimalLeftoversController extends BaseController implements Controller<typeof minimalLeftoversService> {
  @RequestPropsHandle({
    validate: [{ validationObject: { minimalLeftoversArray: isArray } }],
    assert: [{ assertObject: minimalLeftoversArrayAssertObject }],
    transform: { out: transformMinimalLeftoversArrayDBIntoFE },
  })
  async writeAll(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftoversArray } = req.body;

    res.json(await minimalLeftoversService.writeAll(minimalLeftoversArray));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: minimalLeftoversValidationObject }],
    transform: {
      out: d => (d ? transformMinimalLeftoversDBIntoFE(d) : d),
    },
  })
  async write(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftover } = req.body as { minimalLeftover: MinimalLeftover };

    if (minimalLeftover.products.length === 0) {
      await leftoverService.deleteOne(minimalLeftover);
      await this.delete(req, res, __);
    } else {
      // await leftoverService._updateFromMinimalLeftover(minimalLeftover);
      res.json(await minimalLeftoversService.write(minimalLeftover));
    }
  }

  @RequestPropsHandle({ validate: [{ validationObject: minimalLeftoversValidationObject }] })
  async delete(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftover } = req.body as { minimalLeftover: MinimalLeftover };

    await leftoverService.deleteOne({ cityName: minimalLeftover.cityName });

    res.json(await minimalLeftoversService.delete(minimalLeftover));
  }

  async deleteAll(_: Request, res: Response, __: NextFunction) {
    res.json(await minimalLeftoversService.deleteAll());
  }

  @RequestPropsHandle({ transform: { out: transformMinimalLeftoversArrayDBIntoFE } })
  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await minimalLeftoversService.getAll());
  }

  async _updateAll(leftovers: LeftoversList) {
    return minimalLeftoversService.writeAll(
      assignMinimalLeftovers(
        transformMinimalLeftoversArrayDBIntoFE(await minimalLeftoversService.getAll()),
        leftoversIntoMinimalLeftovers(leftovers)
      )
    );
  }
}

export const minimalLeftoversController = new MinimalLeftoversController();
