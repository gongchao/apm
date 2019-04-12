import { Module } from '@nestjs/common';
import { ReceiveReportController } from './controllers/receive-report.controller';

@Module({
  controllers: [ReceiveReportController],
})
export class ReceiveReportModule {}
