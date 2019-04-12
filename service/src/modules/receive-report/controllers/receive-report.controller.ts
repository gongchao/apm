import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectEs } from '@shared/modules/elasticsearch/es.decorator';
import { Client } from 'elasticsearch';
import * as uuid from 'node-uuid';

@Controller()
export class ReceiveReportController {
  constructor(
    @InjectEs() private readonly esClient: Client,
  ) {
  }

  @GrpcMethod('ReceiveReportService')
  Push(payload: { data: string }) {
    try {
      const result = JSON.parse(payload.data);
      const id = uuid.v4();

      this.esClient.bulk({
        body: [
          {
            create: { _index: 'perf_' + result.project, _type: result.type, _id: id },
          },
          {
            ...result,
          },
        ],
      });
    } catch (err) {
      // nothing
      console.log(err);
    }
  }
}
