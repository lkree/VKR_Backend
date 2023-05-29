import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { leftoverController } from '../controller/index.js';

const router = Router();

router.post(Methods.Add, authMiddleware, (...props) => void leftoverController.add(...props));
router.post(Methods.Update, authMiddleware, (...props) => void leftoverController.update(...props));
router.post(Methods.WriteAll, authMiddleware, (...props) => void leftoverController.writeAll(...props));
router.post(Methods.DeleteOne, authMiddleware, (...props) => void leftoverController.deleteOne(...props));
router.get(Methods.DeleteAll, authMiddleware, (...props) => void leftoverController.deleteAll(...props));
router.get(Methods.GetAll, authMiddleware, (...props) => void leftoverController.getAll(...props));
router.get(
  Methods.GetUniqueProducts,
  authMiddleware,
  (...props) => void leftoverController.getUniqueProducts(...props)
);

export { router };
