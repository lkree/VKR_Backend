import express, { RequestHandler } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { citiesPrefixController } from '../controller/index.js';

const router = express.Router();

router.post(Methods.Add, authMiddleware, citiesPrefixController.add as RequestHandler);
router.post(Methods.Delete, authMiddleware, citiesPrefixController.delete as RequestHandler);
router.get(Methods.GetAll, authMiddleware, citiesPrefixController.getAll as RequestHandler);

export { router };
