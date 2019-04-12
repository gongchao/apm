import { Reader } from './lib/reader';
import * as cron from 'node-cron';
import { log } from './log';

log('worker启动');

function main() {
  const reader = new Reader();

  reader.execute();
}

cron.schedule('*/60 * * * * *', main);
