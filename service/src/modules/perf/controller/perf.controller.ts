import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PerfService } from '../services/perf.service';
import * as moment from 'moment';

@Controller()
export class PerfController {
  constructor(
    protected readonly perfSrv: PerfService,
  ) {
  }

  @GrpcMethod('PerfService')
  async GetUrls(payload: { project_id: string, keyword: string, limit: number, s_at: string, e_at: string }) {
    payload.s_at = moment(payload.s_at).toISOString();
    payload.e_at = moment(payload.e_at).toISOString();

    return this.perfSrv.getUrls(payload.project_id, payload.keyword, payload.limit, payload.s_at, payload.e_at);
  }

  @GrpcMethod('PerfService')
  async GetNavigationTiming(payload: { project_id: string, s_at: string, e_at: string }) {
    let { project_id, s_at, e_at } = payload;

    s_at = moment(s_at).toISOString();
    e_at = moment(e_at).toISOString();

    return this.perfSrv.getNavigationTiming(project_id, s_at, e_at);
  }

  @GrpcMethod('PerfService')
  async GetNavigationTimingGroupByDate(payload: { project_id: string, s_at: string | Date, e_at: string | Date, interval: string }) {
    const { project_id, s_at, e_at, interval } = payload;

    return this.perfSrv.getNavigationTimingGroupByDate(project_id, s_at, e_at, interval);
  }
}
