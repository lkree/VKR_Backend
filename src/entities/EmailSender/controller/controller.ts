import type { NextFunction, Request, Response } from 'express';

import type { LeftoversOverdraftList } from '~/entities/Leftovers/types';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestPropsHandle } from '~/shared/lib/decorators';
import { checkEmailValidity } from '~/shared/lib/helpers';
import { Nullable } from '~/shared/lib/ts';

import { emailSenderService } from '../api';

class EmailSenderController extends BaseController implements Controller<typeof emailSenderService> {
  @RequestPropsHandle({ validate: [{ validationObject: { email: checkEmailValidity } }] })
  async sendTestEmail(req: Request, res: Response, __: NextFunction) {
    const { email } = req.body;

    res.json(await emailSenderService.sendTestEmail(email));
  }

  async _sendOverdraftEmails(
    leftoversOverdraftList: LeftoversOverdraftList,
    emailList: Array<{ cityName: string; email: Nullable<string> }>
  ) {
    if (leftoversOverdraftList.length) {
      await Promise.all(
        leftoversOverdraftList.map(overdraft => {
          const email = emailList.find(it => it.cityName === overdraft.cityName)?.email;

          return email ? emailSenderService._sendLeftoverOverdraftEmail(overdraft, email) : null;
        })
      );
    }
  }
}

export const emailSenderController = new EmailSenderController();
