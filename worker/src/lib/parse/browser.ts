import * as useragent from 'useragent';

export const parseBrowser = (userAgent) => {
  return useragent.parse(userAgent)
};
