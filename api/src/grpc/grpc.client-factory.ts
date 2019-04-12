import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class GrpcClientFactory {
  @Client(generateGrpcOptions('0.0.0.0:50050', 'apm', 'apm.proto'))
  public readonly apmServiceClient: ClientGrpc;
}

export function generateGrpcOptions(url: string, packageName: string, protoFileName: string): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      url,
      package: packageName,
      protoPath: join(__dirname, 'protobufs/' + protoFileName),
      loader: {
        keepCase: true,
        arrays: true,
        objects: true,
      },
    },
  };
}
