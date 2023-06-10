import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware';

import { Methods } from '../const';
import { emailSenderController } from '../controller';

const router = Router();

router.post(
  Methods.SendTestEmail,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void emailSenderController.sendTestEmail(...props)
);

export { router };
