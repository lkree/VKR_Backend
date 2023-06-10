import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware';

import { Methods } from '../const';
import { leftoverController } from '../controller';

const router = Router();

router.post(
  Methods.Create,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void leftoverController.create(...props)
);
router.post(Methods.Update, authMiddleware, (...props) => void leftoverController.update(...props));
router.post(
  Methods.UpdateAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void leftoverController.updateAll(...props)
);
router.post(
  Methods.WriteAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void leftoverController.writeAll(...props)
);
router.post(
  Methods.DeleteOne,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void leftoverController.deleteOne(...props)
);
router.get(
  Methods.DeleteAll,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void leftoverController.deleteAll(...props)
);
router.get(Methods.GetAll, authMiddleware, (...props) => void leftoverController.getAll(...props));
router.get(
  Methods.GetUniqueProducts,
  authMiddleware,
  (...props) => void leftoverController.getUniqueProducts(...props)
);

export { router };
