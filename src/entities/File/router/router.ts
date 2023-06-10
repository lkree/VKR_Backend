import { Router } from 'express';

import { authMiddleware } from '~/entities/AuthMiddleware';

import { Methods } from '../const';
import { fileController } from '../controller';

const router = Router();

router.post(Methods.Upload, authMiddleware, (...props) => void fileController.upload(...props));
router.post(Methods.AcceptFile, authMiddleware, (...props) => void fileController.acceptFile(...props));
router.get(Methods.DeleteExisting, authMiddleware, (...props) => void fileController.deleteExisting(...props));
router.get(Methods.GetFileInfo, authMiddleware, (...props) => void fileController.getFileInfo(...props));

export { router };
