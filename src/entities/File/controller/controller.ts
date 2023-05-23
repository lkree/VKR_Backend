import type { RequestParamHandler } from 'express-serve-static-core';

import { ApiError } from '~/entities/ApiError/index.js';

import { isArray, isObject } from '~/shared/lib/helpers/index.js';

import { fileService } from '../api/index.js';
import { FRONTEND_FILE_NAME } from '../const/index.js';

type FileController = { [Method in keyof typeof fileService]: RequestParamHandler };

export const fileController: FileController = {
  upload: async (req, res, next) => {
    try {
      if (!req.files && !isObject(req.files)) throw ApiError.BadRequest('не передан файл');

      const { [FRONTEND_FILE_NAME]: file } = req.files;

      if (!file || isArray(file)) throw ApiError.BadRequest('файл не пришёл или передано несколько файлов');

      return res.json(await fileService.upload(file));
    } catch (e) {
      next(e);
    }
  },

  deleteExisting: async (_, res, next) => {
    try {
      return res.json(await fileService.deleteExisting());
    } catch (e) {
      next(e);
    }
  },

  getFileInfo: async (_, res, next) => {
    try {
      return res.json(await fileService.getFileInfo());
    } catch (e) {
      next(e);
    }
  },
};
