import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { GrpcClientFactory } from '../../grpc/grpc.client-factory';

@Module({
  controllers: [ProjectController],
  providers: [GrpcClientFactory],
})
export class ProjectModule {}
