import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController/index.js';
import { RequestAssert } from '~/shared/lib/decorators/index.js';
import { isObject } from '~/shared/lib/helpers/index.js';

import { configService } from '../api/index.js';

class ConfigController extends BaseController implements Controller<typeof configService> {
  @RequestAssert({ config: isObject })
  async write(req: Request, res: Response, __: NextFunction) {
    const { config } = req.body;

    res.json(await configService.write(config));
  }

  async get(_: Request, res: Response, __: NextFunction) {
    res.json(await configService.get());
  }
}

export const configController = new ConfigController();
