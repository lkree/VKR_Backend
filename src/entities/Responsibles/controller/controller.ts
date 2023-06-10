import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';
import { isObject } from '~/shared/lib/helpers';

import { responsiblePersonsService } from '../api';
import { transformDBArrayIntoFE, transformDBIntoFE } from '../lib/helpers';

class ResponsiblePersonsController extends BaseController implements Controller<typeof responsiblePersonsService> {
  @RequestPropsHandle({
    validate: [{ validationObject: { responsiblePerson: isObject } }],
    transform: { out: transformDBIntoFE },
  })
  async write(req: Request, res: Response, __: NextFunction) {
    const { responsiblePerson } = req.body;

    res.json(await responsiblePersonsService.write(responsiblePerson));
  }

  @RequestPropsHandle({ transform: { out: transformDBArrayIntoFE } })
  async getAll(_: Request, res: Response, __: NextFunction) {
    res.json(await responsiblePersonsService.getAll());
  }

  _getUsersEmailByCity(cities: Array<string>) {
    return Promise.all(cities.map(c => responsiblePersonsService._getUserEmailByCity(c)));
  }
}

export const responsiblePersonsController = new ResponsiblePersonsController();
