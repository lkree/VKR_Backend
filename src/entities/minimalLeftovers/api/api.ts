import { ApiError } from '~/shared/lib/ApiError/index.js';

import { NON_PRODUCT_LEFTOVER } from '../const/index.js';
import { minimalLeftoversModel } from '../model/index.js';
import type { MinimalLeftovers, MinimalLeftoversArray } from '../types/index.js';

const transformMinimalLeftoversDBIntoView = (minimalLeftovers: MinimalLeftovers) => ({
  cityName: minimalLeftovers.cityName,
  products: minimalLeftovers.products.map(product => ({
    name: product.name,
    minimalLeftover: product.minimalLeftover === NON_PRODUCT_LEFTOVER ? 0 : product.minimalLeftover,
    orderingCount: product.orderingCount === NON_PRODUCT_LEFTOVER ? 0 : product.orderingCount,
  })),
});

class MinimalLeftoversService {
  async writeAll(minimalLeftoversArray: MinimalLeftoversArray) {
    await this.deleteAll();
    await minimalLeftoversModel.create(minimalLeftoversArray);

    return this.getAll();
  }

  async write(minimalLeftovers: MinimalLeftovers) {
    await minimalLeftoversModel.updateOne({ cityName: minimalLeftovers.cityName }, minimalLeftovers);

    const newItem = await minimalLeftoversModel.findOne({ cityName: minimalLeftovers.cityName });

    if (newItem) return transformMinimalLeftoversDBIntoView(newItem);

    throw ApiError.ServerError('что-то пошло не так во время обновления записи');
  }

  async delete(minimalLeftovers: MinimalLeftovers) {
    await minimalLeftoversModel.deleteOne({ cityName: minimalLeftovers.cityName });

    return null;
  }

  async deleteAll() {
    await minimalLeftoversModel.deleteMany();

    return [];
  }

  getAll() {
    return minimalLeftoversModel.find().then(d => d.map(transformMinimalLeftoversDBIntoView));
  }
}

export const minimalLeftoversService = new MinimalLeftoversService();
