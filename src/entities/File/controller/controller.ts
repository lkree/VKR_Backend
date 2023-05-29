import type { NextFunction, Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';

import { BaseController, Controller } from '~/shared/lib/BaseController/index.js';
import { RequestAssert, RequestDataFields } from '~/shared/lib/decorators/index.js';

import { fileService } from '../api/index.js';
import { FRONTEND_FILE_NAME } from '../const/index.js';
import { fileAssertObject } from '../lib/helpers/index.js';

class FileController extends BaseController implements Controller<typeof fileService> {
  @RequestAssert(fileAssertObject, RequestDataFields.Files)
  async upload(req: Request, res: Response, __: NextFunction) {
    res.json(await fileService.upload(req.files![FRONTEND_FILE_NAME] as UploadedFile));
  }

  async acceptFile(_: Request, res: Response, __: NextFunction) {
    res.json(await fileService.acceptFile());
  }

  async deleteExisting(_: Request, res: Response, __: NextFunction) {
    res.json(await fileService.deleteExisting());
  }

  async getFileInfo(_: Request, res: Response, __: NextFunction) {
    res.json(await fileService.getFileInfo());
  }
}

export const fileController = new FileController();
