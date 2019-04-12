import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { ProjectService } from '../services/project.service';
import { GrpcStatus } from '@shared/enums/grpc-status.enum';

@Controller()
export class ProjectController {
  constructor(
    private readonly projectSrv: ProjectService,
  ) {
  }

  @GrpcMethod('ProjectService')
  async GetProjectById(payload: { id: string }) {
    const project = await this.projectSrv.getProjectById(payload.id);
    if (!project) throw new RpcException({ code: GrpcStatus.NOT_FOUND, message: 'Could not find!' });

    return project;
  }

  @GrpcMethod('ProjectService')
  async GetProjects(
    payload: { page: number, page_size: number, query: { name: string } },
  ) {
    payload.page = payload.page || 0;
    payload.page_size = payload.page_size || 20;

    const [projects, total] = await this.projectSrv.getProjects(payload);
    return { list: projects, total };
  }

  @GrpcMethod('ProjectService')
  async CreateOrUpdateProject(payload) {
    return await this.projectSrv.createOrUpdateProject(payload);
  }

  @GrpcMethod('ProjectService')
  async DeleteProjectById(payload: { id: string, create_id: string }) {
    await this.projectSrv.deleteProjectById(payload.id);
  }
}
