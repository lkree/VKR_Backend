import { configService } from '~/entities/Config';
import type { LeftoversOverdraft } from '~/entities/Leftovers';

import { ApiError } from '~/shared/lib/ApiError';
import { MailTransport, MailTransportSettings } from '~/shared/lib/MailTransport';

class EmailSenderService {
  _emailClient!: ReturnType<typeof MailTransport>;
  _email!: string;

  constructor() {
    void configService._getFullEmailSettings().then(settings => {
      if (settings && settings.auth) {
        this._email = settings.auth.user;
        this._emailClient = MailTransport(settings as MailTransportSettings);
      }
    });
  }

  async sendTestEmail(email: string) {
    this._checkSystem();

    return this._emailClient
      .sendMail({
        from: `"test" <${this._email}>`,
        to: email,
        subject: 'Test ✔',
        html: '<b>Test</b>',
      })
      .then(() => true)
      .catch(e => Promise.reject(ApiError.ServerError((e as Error).message)));
  }

  _sendLeftoverOverdraftEmail(leftoverOverdraft: LeftoversOverdraft, email: string) {
    this._checkSystem();

    return this._emailClient
      .sendMail({
        from: `Система учёта остатков <${this._email}>`,
        to: email,
        subject: `Необходимо дозаказать остатки по складу в городе ${leftoverOverdraft.cityName}`,
        html: leftoverOverdraft.overdraftList.reduce(
          (r, overdraft) =>
            r + `${overdraft.nomenclature}: <strong>${overdraft.haveToOrder} ${overdraft.unit}</strong>;<br>`,
          `На ${new Date().toLocaleDateString()} в городе ${leftoverOverdraft.cityName} необходимо дозаказать:<br>`
        ),
      })
      .then(() => true)
      .catch(e => Promise.reject(ApiError.ServerError((e as Error).message)));
  }

  _checkSystem() {
    if (!this._emailClient) {
      throw ApiError.BadRequest('Что не так с настройками почтового клиента. Возможно они не заданы');
    }
  }
}

export const emailSenderService = new EmailSenderService();
