import { computePathWithDomain } from '~/shared/api/index.js';
import { computeDirName } from '~/shared/lib/helpers/index.js';
import type { MethodsMap } from '~/shared/lib/ts/index.js';

import { fileController } from '../controller/index.js';

export const FILE_DIRECTORY = computeDirName('/assets/1c/');
export const FILE_DEFAULT_NAME = '/leftovers.html';
export const FRONTEND_FILE_NAME = 'file';

const computePath = computePathWithDomain('file');

export const Methods: MethodsMap<typeof fileController> = {
  AcceptFile: computePath('acceptFile'),
  Upload: computePath('upload'),
  DeleteExisting: computePath('deleteExisting'),
  GetFileInfo: computePath('getFileInfo'),
};
