import { resolve } from 'path';

export const config = {
  proto_path: resolve(__dirname, 'report.proto'),

  grpc_report_url: '127.0.0.1:50050',

  record_file: 'report.gif',

  log_path: '/root/logs/<% __p += format("YYYYMMDDHHmm") %>.log',

  nginx_log_format: '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$http_x_forwarded_for"',
};
