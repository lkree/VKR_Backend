import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';

import { Methods } from '../const';
import { responsiblePersonsController } from '../controller';

const router = Router();

router.post(Methods.Write, authMiddleware, (...props) => void responsiblePersonsController.write(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void responsiblePersonsController.getAll(...props));

export { router };
