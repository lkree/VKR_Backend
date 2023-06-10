import { createTransport } from 'nodemailer';

export type MailTransportSettings = Parameters<typeof createTransport>[0];

export const MailTransport = (emailerSettings: MailTransportSettings) => createTransport(emailerSettings);
