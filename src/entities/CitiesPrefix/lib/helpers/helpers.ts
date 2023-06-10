import { alphabeticalSort, isString } from '~/shared/lib/helpers';

import type { CitiesPrefix } from '../../types';

export const cityPrefixValidationObject = { prefix: isString };
export const cityNamePrefixValidationObject = { name: isString, ...cityPrefixValidationObject };

export const citiesPrefixDBIntoFE = ({ name, prefix }: CitiesPrefix): [string, string] => [name, prefix];

export const citiesPrefixArrayDBIntoFE = (d: Array<CitiesPrefix>) =>
  d.map(citiesPrefixDBIntoFE).sort((a, b) => alphabeticalSort(a[0], b[0]));
