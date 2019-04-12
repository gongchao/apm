import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PerformanceComponent } from './performance/performance.component';

@NgModule({
  imports: [SharedModule, ProjectRoutingModule],
  declarations: [
    DashboardComponent,
    PerformanceComponent,
  ],
})
export class ProjectModule {
}
