import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import * as uuid from 'node-uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity) private readonly projectRep: Repository<ProjectEntity>,
  ) {
  }

  async getProjectById(id) {
    return await this.projectRep.findOne(id);
  }

  async getProjects(queryConditions): Promise<any[]> {
    return await this.projectRep.findAndCount({
      where: {
        ...(queryConditions.query || {}),
        is_delete: false,
      },
      skip: queryConditions.page * queryConditions.page_size,
      take: queryConditions.page_size,
    });
  }

  async createOrUpdateProject(payload) {
    const project = new ProjectEntity();
    project.id = payload.id || uuid.v4();
    project.name = payload.name;
    project.description = payload.description;
    project.rate = payload.rate || 10000;
    project.create_uid = payload.create_uid || 0;

    return this.projectRep.save(project);
  }

  async deleteProjectById(id) {
    return this.projectRep.delete(id);
  }
}
