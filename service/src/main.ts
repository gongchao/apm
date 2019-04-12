import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from '@env';
import { getProtoPath } from 'google-proto-files';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0' + ':' + config.port,
      package: 'apm',
      protoPath: join(__dirname, 'protobufs/apm.proto'),
      loader: {
        keepCase: true,
        arrays: true,
        objects: true,
        includeDirs: [getProtoPath('rpc')],
      },
    },
  });

  await app.listenAsync();
}

bootstrap();
