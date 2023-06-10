import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';

import { citiesPrefixService } from '../api';
import { citiesPrefixArrayDBIntoFE, cityNamePrefixValidationObject, cityPrefixValidationObject } from '../lib/helpers';

class CitiesPrefixController extends BaseController implements Controller<typeof citiesPrefixService> {
  @RequestPropsHandle({
    validate: [{ validationObject: cityNamePrefixValidationObject }],
    transform: { out: citiesPrefixArrayDBIntoFE },
  })
  async add(req: Request, res: Response, __: NextFunction) {
    res.json(await citiesPrefixService.add(req.body));
  }

  @RequestPropsHandle({
    validate: [{ validationObject: cityPrefixValidationObject }],
    transform: { out: citiesPrefixArrayDBIntoFE },
  })
  async delete(req: Request, res: Response, __: NextFunction) {
    res.json(await citiesPrefixService.delete(req.body));
  }

  @RequestPropsHandle({ transform: { out: citiesPrefixArrayDBIntoFE } })
  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await citiesPrefixService.getAll());
  }
}

export const citiesPrefixController = new CitiesPrefixController();
