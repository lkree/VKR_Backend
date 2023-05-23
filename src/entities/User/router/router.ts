import { RequestHandler, Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { userController } from '../controller/index.js';

const router = Router();

router.post(Methods.Registration, userController.registration as RequestHandler);
router.post(Methods.Login, userController.login as RequestHandler);
router.post(Methods.Logout, userController.logout as RequestHandler);
router.get(Methods.Refresh, userController.refresh as RequestHandler);
router.get(Methods.Session, userController.session as RequestHandler);
router.get(Methods.Users, authMiddleware, userController.getUsers as RequestHandler);

export { router };
