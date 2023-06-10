import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware';

import { Methods } from '../const';
import { minimalLeftoversController } from '../controller';

const router = Router();

router.post(
  Methods.WriteAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void minimalLeftoversController.writeAll(...props)
);
router.post(
  Methods.Write,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void minimalLeftoversController.write(...props)
);
router.get(
  Methods.GetAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void minimalLeftoversController.getAll(...props)
);
router.get(
  Methods.DeleteAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void minimalLeftoversController.deleteAll(...props)
);

export { router };
