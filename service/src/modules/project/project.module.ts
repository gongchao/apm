import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { ProjectEntity } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {
}
