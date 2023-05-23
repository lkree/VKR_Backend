import type { CITIES_SETTINGS } from '../const/index.js';

export type CitiesKeys = keyof typeof CITIES_SETTINGS;
export type Cities = (typeof CITIES_SETTINGS)[CitiesKeys];
