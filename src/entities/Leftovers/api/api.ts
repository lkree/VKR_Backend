import { fileLeftoversToDB } from '~/entities/Leftovers/lib/helpers/index.js';

import { leftoversModel } from '../model/index.js';
import type { Leftovers, Leftover, FileLeftovers } from '../types/index.js';

class LeftoverService {
  async writeAll(leftovers: Leftovers) {
    await this.deleteAll();

    return this.add(leftovers);
  }

  async add(leftovers: Leftovers | Leftover) {
    await leftoversModel.create(leftovers);

    return this.getAll();
  }

  async update(leftovers: Leftover | Leftovers) {
    if (Array.isArray(leftovers)) await leftoversModel.updateMany(leftovers);
    else await leftoversModel.updateOne({ cityName: leftovers.cityName }, leftovers);

    return this.getAll();
  }

  async deleteAll() {
    await leftoversModel.deleteMany();

    return [];
  }

  async deleteOne(leftover: Leftover) {
    await leftoversModel.deleteOne(leftover);

    return this.getAll();
  }

  async _saveLeftoversFromFile(data: FileLeftovers) {
    await this.writeAll(fileLeftoversToDB(data));

    return this.getAll();
  }

  getUniqueProducts() {
    return this.getAll().then(data => [
      ...data.reduce((result, it) => {
        it.leftovers.forEach(({ nomenclature }) => result.add(nomenclature));

        return result;
      }, new Set()),
    ]);
  }

  getAll() {
    return leftoversModel.find();
  }
}

export const leftoverService = new LeftoverService();
