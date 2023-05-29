import { ApiError } from '~/shared/lib/ApiError/index.js';

import { citiesPrefixModel } from '../model/index.js';

class CitiesPrefixService {
  async add(city: string, prefix: string) {
    if (await citiesPrefixModel.findOne({ prefix })) {
      throw ApiError.BadRequest(`Город с таким префиксом ${prefix} уже существует`);
    }

    await citiesPrefixModel.create({ name: city, prefix: prefix.toLowerCase() });

    return this.getAll();
  }

  async delete(prefix: string) {
    await citiesPrefixModel.deleteOne({ prefix });

    return this.getAll();
  }

  async getAll() {
    return citiesPrefixModel.find().then(r => r.map(({ name, prefix }) => [name, prefix]));
  }

  _getCitiesSettings() {
    return this.getAll().then(d => d.reduce((result, it) => ({ ...result, [it[1]!]: it[0] }), {}));
  }
}

export const citiesPrefixService = new CitiesPrefixService();
