import type { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';

import { FILE_DEFAULT_NAME, FILE_DIRECTORY } from '../const/index.js';
import { fileModel } from '../model/index.js';

class FileService {
  async upload(file: UploadedFile) {
    await Promise.all([file.mv(FILE_DIRECTORY + FILE_DEFAULT_NAME), fileModel.deleteMany()]).then(() =>
      fileModel.create({ uploadDate: +new Date() })
    );

    return true;
  }

  deleteExisting() {
    return new Promise(resolve => {
      let n = 0;

      const accept = () => (n > 0 ? resolve(true) : ++n);

      void fileModel.deleteMany().then(accept);
      fs.unlink(FILE_DIRECTORY + FILE_DEFAULT_NAME, accept);
    });
  }

  getFileInfo() {
    return fileModel.find().then(files => files.map(({ uploadDate }) => ({ uploadDate }))[0]);
  }
}

export const fileService = new FileService();
