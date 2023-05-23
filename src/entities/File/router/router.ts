import express, { RequestHandler } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { fileController } from '../controller/index.js';

const router = express.Router();

router.post(Methods.Upload, authMiddleware, fileController.upload as RequestHandler);
router.get(Methods.DeleteExisting, authMiddleware, fileController.deleteExisting as RequestHandler);
router.get(Methods.GetFileInfo, authMiddleware, fileController.getFileInfo as RequestHandler);

export { router };
