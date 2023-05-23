import { leftoversModel } from '../model/index.js';
import type { Leftovers, Leftover } from '../types/index.js';

class LeftoverService {
  async recreate(leftovers: Leftovers) {
    await this.deleteAll();

    return this.add(leftovers);
  }

  async add(leftovers: Leftovers | Leftover) {
    await leftoversModel.create(leftovers);

    return this.getAll();
  }

  async update(leftovers: Leftover | Leftovers) {
    await leftoversModel[Array.isArray(leftovers) ? 'updateMany' : 'updateOne'](leftovers);

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

  getAll() {
    return leftoversModel.find();
  }
}

export const leftoverService = new LeftoverService();
