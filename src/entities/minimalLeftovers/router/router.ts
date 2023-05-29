import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { minimalLeftoversController } from '../controller/index.js';

const router = Router();

router.post(Methods.WriteAll, authMiddleware, (...props) => void minimalLeftoversController.writeAll(...props));
router.post(Methods.Write, authMiddleware, (...props) => void minimalLeftoversController.write(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void minimalLeftoversController.getAll(...props));
router.get(Methods.DeleteAll, authMiddleware, (...props) => void minimalLeftoversController.deleteAll(...props));

export { router };
