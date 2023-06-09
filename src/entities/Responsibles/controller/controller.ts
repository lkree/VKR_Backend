import type { NextFunction, Request, Response } from 'express';

import type { Leftovers } from '~/entities/Leftovers';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestAssert, RequestPropsValidation } from '~/shared/lib/decorators';
import { isArray } from '~/shared/lib/helpers';

import { minimalLeftoversService } from '../api';
import {
  assignMinimalLeftovers,
  leftoversIntoMinimalLeftovers,
  minimalLeftoversArrayAssertObject,
  minimalLeftoversValidationObject,
} from '../lib/helpers';
import type { MinimalLeftovers } from '../types';

class MinimalLeftoversController extends BaseController implements Controller<typeof minimalLeftoversService> {
  @RequestPropsValidation({ minimalLeftoversArray: isArray })
  @RequestAssert(minimalLeftoversArrayAssertObject)
  async writeAll(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftoversArray } = req.body;

    res.json(await minimalLeftoversService.writeAll(minimalLeftoversArray));
  }

  @RequestPropsValidation(minimalLeftoversValidationObject)
  async write(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftovers } = req.body as { minimalLeftovers: MinimalLeftovers };

    if (minimalLeftovers.products.length === 0) res.json(await minimalLeftoversService.delete(minimalLeftovers));
    else res.json(await minimalLeftoversService.write(minimalLeftovers));
  }

  @RequestPropsValidation(minimalLeftoversValidationObject)
  async delete(req: Request, res: Response, __: NextFunction) {
    const { minimalLeftovers } = req.body;

    res.json(await minimalLeftoversService.delete(minimalLeftovers));
  }

  async deleteAll(_: Request, res: Response, __: NextFunction) {
    res.json(await minimalLeftoversService.deleteAll());
  }

  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await minimalLeftoversService.getAll());
  }

  async _updateAll(leftovers: Leftovers) {
    return minimalLeftoversService.writeAll(
      assignMinimalLeftovers(await minimalLeftoversService.getAll(), leftoversIntoMinimalLeftovers(leftovers))
    );
  }
}

export const minimalLeftoversController = new MinimalLeftoversController();
