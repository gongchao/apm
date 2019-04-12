import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { GrpcClientFactory } from '../../grpc/grpc.client-factory';

@Controller('/api/perf')
export class PerfController implements OnModuleInit {
  private perfSrv: any;

  constructor(
    @Inject(GrpcClientFactory) private readonly grpcClientFactory: GrpcClientFactory,
  ) {
  }

  onModuleInit() {
    this.perfSrv = this.grpcClientFactory.apmServiceClient.getService('PerfService');
  }

  @Get('navigationTiming')
  getNavigationTiming(@Query('id') id: number, @Query('url') url: string, @Query('sAt') sAt: string, @Query('eAt') eAt: string) {
    return this.perfSrv.getNavigationTiming({ project_id: id, url, s_at: sAt, e_at: eAt });
  }

  @Get('navigationTimingGroupByDate')
  getNavigationTimingGroupByDate(
    @Query('id') id: number,
    @Query('url') url: string,
    @Query('sAt') sAt: string,
    @Query('eAt') eAt: string,
    @Query('interval') interval: string,
  ) {
    return this.perfSrv.getNavigationTimingGroupByDate({ project_id: id, url, s_at: sAt, e_at: eAt, interval });
  }
}
