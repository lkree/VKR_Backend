import type { NextFunction, Request, Response } from 'express';

import { BaseController, Controller } from '~/shared/lib/BaseController';

import { configService } from '../api';

class ConfigController extends BaseController implements Controller<typeof configService> {
  async writeEmailSettings(req: Request, res: Response, __: NextFunction) {
    const { password, port, secure, user, host } = req.body;
    const oldConfig = await configService.getEmailSettings();

    res.json(
      await configService.writeEmailSettings({
        emailSettings: { ...oldConfig, password, port, secure, user, host },
      })
    );
  }

  async getEmailSettings(_: Request, res: Response, __: NextFunction) {
    res.json(await configService.getEmailSettings());
  }
}

export const configController = new ConfigController();
