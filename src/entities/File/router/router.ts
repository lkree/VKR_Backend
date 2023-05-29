import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware/index.js';

import { Methods } from '../const/index.js';
import { fileController } from '../controller/index.js';

const router = Router();

router.post(Methods.Upload, authMiddleware, (...props) => void fileController.upload(...props));
router.get(Methods.AcceptFile, authMiddleware, (...props) => void fileController.acceptFile(...props));
router.get(Methods.DeleteExisting, authMiddleware, (...props) => void fileController.deleteExisting(...props));
router.get(Methods.GetFileInfo, authMiddleware, (...props) => void fileController.getFileInfo(...props));

export { router };
