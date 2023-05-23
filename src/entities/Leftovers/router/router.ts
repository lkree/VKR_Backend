import express, { RequestHandler } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { leftoverController } from '../controller/index.js';

const router = express.Router();

router.post(Methods.Add, authMiddleware, leftoverController.add as RequestHandler);
router.post(Methods.Update, authMiddleware, leftoverController.update as RequestHandler);
router.post(Methods.Recreate, authMiddleware, leftoverController.recreate as RequestHandler);
router.post(Methods.DeleteOne, authMiddleware, leftoverController.deleteOne as RequestHandler);
router.get(Methods.DeleteAll, authMiddleware, leftoverController.deleteAll as RequestHandler);
router.get(Methods.GetAll, authMiddleware, leftoverController.getAll as RequestHandler);

export { router };
