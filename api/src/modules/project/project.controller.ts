import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { GrpcClientFactory } from '../../grpc/grpc.client-factory';

@Controller('api/project')
export class ProjectController implements OnModuleInit {
  private projectSrv: any;

  constructor(
    @Inject(GrpcClientFactory) private readonly grpcClientFactory: GrpcClientFactory,
  ) {
  }

  onModuleInit() {
    this.projectSrv = this.grpcClientFactory.apmServiceClient.getService('ProjectService');
  }

  @Get('')
  getAllProjects() {
    return this.projectSrv.getProjects({ page: 0, page_size: 20 });
  }
}
