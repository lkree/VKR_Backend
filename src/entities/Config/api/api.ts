import { configModel } from '../model/index.js';
import { Config } from '../types/index.js';

class ConfigService {
  async write(config: Required<Config>) {
    await configModel.deleteMany();
    await configModel.create(config);

    return this.get();
  }

  get() {
    return configModel.find().then(r => r.map(({ emailSettings }) => emailSettings).at(0) ?? {});
  }
}

export const configService = new ConfigService();
