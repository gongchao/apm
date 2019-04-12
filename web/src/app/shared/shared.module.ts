import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgZorroAntdModule,
    ViserModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgZorroAntdModule,
    ViserModule,
  ],
})
export class SharedModule {
}
