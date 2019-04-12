import { NgModule } from '@angular/core';
import { DefaultLayoutComponent } from './default/default.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [
    DefaultLayoutComponent,
  ],
  exports: [
    DefaultLayoutComponent,
  ],
})
export class LayoutModule {
}
