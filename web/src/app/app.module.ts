import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutesModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
