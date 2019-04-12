import * as grpc from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { resolve } from 'path';
import { config } from '../../config';

const PROTO_PATH = resolve(__dirname, 'report.proto');

const packageDefinition = loadSync(PROTO_PATH);

const apm_proto: any = grpc.loadPackageDefinition(packageDefinition).apm;

const empty = () => {};

export const push = (data, cb = empty) => {
  return new apm_proto.ReceiveReportService(config.grpc_report_url, grpc.credentials.createInsecure())
    .push({ data: JSON.stringify(data) }, cb);
};
