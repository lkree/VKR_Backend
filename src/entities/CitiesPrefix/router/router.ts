import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { citiesPrefixController } from '../controller/index.js';

const router = Router();

router.post(Methods.Add, authMiddleware, (...props) => void citiesPrefixController.add(...props));
router.post(Methods.Delete, authMiddleware, (...props) => void citiesPrefixController.delete(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void citiesPrefixController.getAll(...props));

export { router };
