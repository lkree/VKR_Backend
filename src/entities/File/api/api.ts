import type { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';

import { citiesPrefixService } from '~/entities/CitiesPrefix';
import { emailSenderController } from '~/entities/EmailSender';
import { HTMLParser } from '~/entities/HTMLParser';
import { leftoverController } from '~/entities/Leftovers';
import { minimalLeftoversController } from '~/entities/MinimalLeftovers';
import { responsiblePersonsController } from '~/entities/Responsibles';
import { Transfer1cData } from '~/entities/Transfer1cData';

import { ApiError } from '~/shared/lib/ApiError';
import { transformObjectWithStringsToNumbers } from '~/shared/lib/helpers';

import { FILE_DEFAULT_NAME, FILE_DIRECTORY } from '../const';
import { fileModel } from '../model';

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

  async acceptFile({ notify }: { notify: boolean } = { notify: false }) {
    return new Promise((resolve, reject) => {
      fs.readFile(FILE_DIRECTORY + FILE_DEFAULT_NAME, (err, data) => {
        if (err) return reject(ApiError.ServerError(err.message));

        citiesPrefixService
          ._getCitiesSettings()
          .then(citiesSettings => {
            const parsedData = Transfer1cData(HTMLParser(data.toString()), citiesSettings);

            if (!parsedData) throw ApiError.ServerError('что-то пошло не так при попытке транспиляции файла');

            void leftoverController
              ._saveLeftoversFromFile(transformObjectWithStringsToNumbers(parsedData))
              .then(() => this.getFileInfo())
              .then(currentFileInfo => {
                const newFileModelInfo = currentFileInfo
                  ? { ...currentFileInfo, lastUpdatedDate: currentFileInfo.uploadDate }
                  : null;

                return fileModel
                  .deleteMany()
                  .then(() => fileModel.create(newFileModelInfo))
                  .then(() => leftoverController._getAll())
                  .then(leftovers => minimalLeftoversController._updateAll(leftovers))
                  .then(() => resolve(newFileModelInfo))
                  .then(() => leftoverController._getLeftoversWithOverdraft())
                  .then(
                    async leftoversOverdraft =>
                      notify &&
                      emailSenderController._sendOverdraftEmails(
                        leftoversOverdraft,
                        await responsiblePersonsController._getUsersEmailByCity(
                          leftoversOverdraft.map(({ cityName }) => cityName)
                        )
                      )
                  );
              });
          })
          .catch((e: Error) => reject(ApiError.ServerError(e.message)));
      });
    });
  }

  getFileInfo() {
    return fileModel
      .findOne()
      .then(data => (data ? { uploadDate: data.uploadDate, lastUpdatedDate: data.lastUpdatedDate } : null));
  }
}

export const fileService = new FileService();
