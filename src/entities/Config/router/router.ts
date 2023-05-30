import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';
import { checkAdminMiddleware } from '~/entities/CheckAdminMiddleware/index.js';

import { Methods } from '../const/index.js';
import { configController } from '../controller/index.js';

const router = Router();

router.post(Methods.Write, authMiddleware, checkAdminMiddleware, (...props) => void configController.write(...props));
router.get(Methods.Get, authMiddleware, checkAdminMiddleware, (...props) => void configController.get(...props));

export { router };
