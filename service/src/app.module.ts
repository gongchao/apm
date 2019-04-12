import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@env';
import { ProjectModule } from './modules/project/project.module';
import { ReceiveReportModule } from './modules/receive-report/receive-report.module';
import { EsModule } from '@shared/modules/elasticsearch/es.module';
import { PerfModule } from './modules/perf/perf.module';

const MODULES = [
  ProjectModule,
  PerfModule,
  ReceiveReportModule,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(config.mysql),
    EsModule.register(config.elasticsearch),
    ...MODULES,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
