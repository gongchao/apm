import { Module } from '@nestjs/common';
import { PerfController } from './perf.controller';
import { GrpcClientFactory } from '../../grpc/grpc.client-factory';

@Module({
  controllers: [PerfController],
  providers: [GrpcClientFactory],
})
export class PerfModule {}
