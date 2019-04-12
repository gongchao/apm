import * as LibQqwry from 'lib-qqwry';
const qqwry = LibQqwry();

qqwry.speed();

export const parseIp = (ip) => {
  return qqwry.searchIP(ip);
};
