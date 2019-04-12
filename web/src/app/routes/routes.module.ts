import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from './routes-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  DashboardComponent,
  ProjectsComponent,
];

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class RoutesModule {
}
