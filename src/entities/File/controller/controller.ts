import type { NextFunction, Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';

import { BaseController, Controller } from '~/shared/lib/BaseController';
import { RequestDataFields, RequestPropsHandle } from '~/shared/lib/decorators';

import { fileService } from '../api';
import { FRONTEND_FILE_NAME } from '../const';
import { fileAssertObject } from '../lib/helpers';

class FileController extends BaseController implements Controller<typeof fileService> {
  @RequestPropsHandle({ assert: [{ assertObject: fileAssertObject, fieldToExecuteData: RequestDataFields.Files }] })
  async upload(req: Request, res: Response, __: NextFunction) {
    res.json(await fileService.upload(req.files![FRONTEND_FILE_NAME] as UploadedFile));
  }

  async acceptFile(req: Request, res: Response, __: NextFunction) {
    res.json(await fileService.acceptFile(req.body));
  }

  async deleteExisting(_: Request, res: Response, __: NextFunction) {
    res.json(await fileService.deleteExisting());
  }

  async getFileInfo(_: Request, res: Response, __: NextFunction) {
    res.json(await fileService.getFileInfo());
  }
}

export const fileController = new FileController();
