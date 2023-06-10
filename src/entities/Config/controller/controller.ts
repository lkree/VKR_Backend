import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';

import { configService } from '../api';
import { emailSettingsValidationObject, transformBDConfigToFE } from '../lib/helpers';

class ConfigController extends BaseController implements Controller<typeof configService> {
  @RequestPropsHandle({
    validate: [{ validationObject: emailSettingsValidationObject }],
    transform: { out: transformBDConfigToFE },
  })
  async writeEmailSettings(req: Request, res: Response, __: NextFunction) {
    const oldConfig = await configService.getEmailSettings();

    res.json(
      await configService.writeEmailSettings({
        emailSettings: { ...oldConfig, ...req.body },
      })
    );
  }

  @RequestPropsHandle({ transform: { out: transformBDConfigToFE } })
  async getEmailSettings(_: Request, res: Response, __: NextFunction) {
    res.json(await configService.getEmailSettings());
  }
}

export const configController = new ConfigController();
