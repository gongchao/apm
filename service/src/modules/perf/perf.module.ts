import { Module } from '@nestjs/common';
import { PerfController } from './controller/perf.controller';
import { PerfService } from './services/perf.service';

@Module({
  controllers: [PerfController],
  providers: [PerfService],
})
export class PerfModule {}
