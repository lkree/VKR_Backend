import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware';

import { Methods } from '../const';
import { configController } from '../controller';

const router = Router();

router.post(
  Methods.WriteEmailSettings,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void configController.writeEmailSettings(...props)
);
router.get(
  Methods.GetEmailSettings,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void configController.getEmailSettings(...props)
);

export { router };
