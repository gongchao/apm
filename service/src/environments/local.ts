import { resolve } from 'path';

export const environment = {
  port: 50050,

  mysql: {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: '',
    database: 'apm',
    entities: [resolve(__dirname, '../') + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: ['query', 'error'],
  },

  elasticsearch: {
    host: '0.0.0.0:9200',
    log: 'trace',
  },
};
