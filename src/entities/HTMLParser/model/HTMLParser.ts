import { HTMLElement, parse } from 'node-html-parser';

const HEAD_SELECTOR = 'tr.R7';
const BODY_SELECTOR = 'tr.R8';
const BODY_DATA_SELECTOR = 'td.R9C0';

const initStructure = (head: HTMLElement) =>
  [...head.querySelectorAll('td')].reduce(
    (r, td) => (td.textContent ? [...r, td.textContent] : r),
    [] as Array<string>
  );

const fillStructure = (trsWithData: Array<HTMLElement>, structure: string[]) =>
  trsWithData.reduce((r, tr) => {
    const tdsData = [...tr.querySelectorAll('td')].reduce((data, td, i) => {
      if (td.textContent && structure[i]) data[structure[i]!] = td.textContent;

      return data;
    }, {} as Record<(typeof structure)[number], string>);

    if (Object.keys(tdsData)) r.push(tdsData);

    return r;
  }, [] as Array<Record<string, string>>);

export const HTMLParser = (html: string) => {
  const root = parse(html);
  const elementsWithBodyData = [...root.querySelectorAll(BODY_SELECTOR)].filter(n =>
    n.querySelector(BODY_DATA_SELECTOR)
  );
  const header = root.querySelector(HEAD_SELECTOR)!;

  if (!header) throw Error('no header in parsed HTML');

  return fillStructure(elementsWithBodyData, initStructure(header));
};
