import { Headers } from 'node-fetch';

export const computeHeaders = (headers: Record<string, string>) =>
  Object.entries(headers).reduce((result, [key, value]) => {
    result.append(key, value);

    return result;
  }, new Headers());

export const computeGetParams = (params: Record<string, string>) =>
  Object.entries(params).reduce((result, [key, value]) => {
    result.append(key, value);

    return result;
  }, new URLSearchParams());

export const computePathWithDomain = (domain: string) => (path: string) => `/${domain}/${path}/`;
