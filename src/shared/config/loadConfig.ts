import * as fs from 'fs';
import _ from 'lodash';

import { CONFIG_PATH } from '~/shared/const';
import { computeDirName, loadJSON } from '~/shared/lib/helpers';
import { AnyFunction } from '~/shared/lib/ts';

import type { Config } from './types';

export const loadConfig = () => loadJSON<Config>(CONFIG_PATH);
export const saveConfig = (config: Config, cb: AnyFunction = _.noop) =>
  fs.writeFile(computeDirName(CONFIG_PATH), JSON.stringify(config, null, 2), {}, cb);
