import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware';

import { Methods } from '../const';
import { userController } from '../controller';

const router = Router();

router.post(
  Methods.Registration,
  authMiddleware,
  checkAdminMiddleware,
  (...props) => void userController.registration(...props)
);
router.post(Methods.Login, (...props) => void userController.login(...props));
router.post(Methods.Logout, (...props) => void userController.logout(...props));
router.get(Methods.Refresh, (...props) => void userController.refresh(...props));
router.get(Methods.Session, (...props) => void userController.session(...props));
router.get(Methods.Update, authMiddleware, checkAdminMiddleware, (...props) => void userController.update(...props));
router.get(Methods.Delete, authMiddleware, checkAdminMiddleware, (...props) => void userController.delete(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void userController.getAll(...props));

export { router };
