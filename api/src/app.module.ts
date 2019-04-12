import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/project/project.module';
import { PerfModule } from './modules/perf/perf.module';

@Module({
  imports: [
    ProjectModule,
    PerfModule,
  ],
})
export class AppModule {}
