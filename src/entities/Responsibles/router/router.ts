import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';

import { Methods } from '../const';
import { minimalLeftoversController } from '../controller';

const router = Router();

router.post(Methods.WriteAll, authMiddleware, (...props) => void minimalLeftoversController.writeAll(...props));
router.post(Methods.Write, authMiddleware, (...props) => void minimalLeftoversController.write(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void minimalLeftoversController.getAll(...props));
router.get(Methods.DeleteAll, authMiddleware, (...props) => void minimalLeftoversController.deleteAll(...props));

export { router };
