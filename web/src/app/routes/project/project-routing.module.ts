import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerformanceComponent } from './performance/performance.component';

const routes: Routes = [
  { path: '', redirectTo: 'performance', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'ajax', component: DashboardComponent },
  { path: 'browser', component: DashboardComponent },
  { path: 'operator', component: DashboardComponent },
  { path: 'area', component: DashboardComponent },
  { path: 'setting', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
}
