import type { FileArray } from 'express-fileupload';

import { ApiError } from '~/shared/lib/ApiError/index.js';
import { FULL_VALUE } from '~/shared/lib/decorators/index.js';
import { isArray, isObject } from '~/shared/lib/helpers/index.js';

import { FRONTEND_FILE_NAME } from '../../const/index.js';

export const fileAssertObject = {
  [FULL_VALUE]: (files: FileArray) => {
    if (!files && !isObject(files)) throw ApiError.BadRequest('не передан файл');

    const { [FRONTEND_FILE_NAME]: file } = files;

    if (!file || isArray(file)) throw ApiError.BadRequest('файл не пришёл или передано несколько файлов');
  },
};
