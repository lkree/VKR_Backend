import { isString } from '~/shared/lib/helpers/index.js';

export const cityPrefixValidationObject = { cityPrefix: isString };
export const cityNamePrefixValidationObject = { cityName: isString, ...cityPrefixValidationObject };
