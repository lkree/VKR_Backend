import * as fs from 'fs';
import _ from 'lodash';

import { CONFIG_PATH } from '~/shared/const/index.js';
import { computeDirName, loadJSON } from '~/shared/lib/helpers/index.js';
import { AnyFunction } from '~/shared/lib/ts/index.js';

import type { Config } from './types.js';

export const loadConfig = () => loadJSON<Config>(CONFIG_PATH);
export const saveConfig = (config: Config, cb: AnyFunction = _.noop) =>
  fs.writeFile(computeDirName(CONFIG_PATH), JSON.stringify(config, null, 2), {}, cb);
