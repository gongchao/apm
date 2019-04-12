import { resolve } from 'path';
import { sync as globSync } from 'glob';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const [configFile] = globSync(resolve(`${__dirname}/${env}{.ts,.js}`));

if (!configFile) {
  throw new Error('指定的 NODE_ENV 缺少相应的配置文件');
}

export const config = require(configFile).environment;
