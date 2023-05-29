export type CitiesSettings = Record<string, string>;
export type CitiesKeys = keyof CitiesSettings;
export type Cities = CitiesSettings[CitiesKeys];
