import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController/index.js';
import { RequestPropsValidation } from '~/shared/lib/decorators/index.js';

import { citiesPrefixService } from '../api/index.js';
import { cityNamePrefixValidationObject, cityPrefixValidationObject } from '../lib/helpers/index.js';

class CitiesPrefixController extends BaseController implements Controller<typeof citiesPrefixService> {
  @RequestPropsValidation(cityNamePrefixValidationObject)
  async add(req: Request, res: Response, __: NextFunction) {
    const { cityName, cityPrefix } = req.body;

    res.json(await citiesPrefixService.add(cityName, cityPrefix));
  }

  @RequestPropsValidation(cityPrefixValidationObject)
  async delete(req: Request, res: Response, __: NextFunction) {
    const { cityPrefix } = req.body;

    res.json(await citiesPrefixService.delete(cityPrefix));
  }

  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await citiesPrefixService.getAll());
  }
}

export const citiesPrefixController = new CitiesPrefixController();
