import type { FileArray } from 'express-fileupload';

import { ApiError } from '~/shared/lib/ApiError';
import { FULL_VALUE } from '~/shared/lib/decorators';
import { isArray, isObject } from '~/shared/lib/helpers';

import { FRONTEND_FILE_NAME } from '../../const';

export const fileAssertObject = {
  [FULL_VALUE]: (files: FileArray) => {
    if (!files && !isObject(files)) throw ApiError.BadRequest('не передан файл');

    const { [FRONTEND_FILE_NAME]: file } = files;

    if (!file || isArray(file)) throw ApiError.BadRequest('файл не пришёл или передано несколько файлов');
  },
};
