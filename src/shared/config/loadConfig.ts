import * as fs from 'fs';
import _ from 'lodash';
import type { Config } from '~/shared/config/types.js';
import { CONFIG_PATH, SRC_CONFIG_PATH } from '~/shared/const/index.js';
import { computeDirName, loadJSON } from '~/shared/lib/helpers/index.js';
import { AnyFunction } from '~/shared/lib/ts/index.js';

export const loadConfig = () => loadJSON<Config>(CONFIG_PATH);
export const saveConfig = (config: Config, cb: AnyFunction = _.noop) =>
  fs.writeFile(computeDirName(SRC_CONFIG_PATH), JSON.stringify(config, null, 2), {}, cb);
