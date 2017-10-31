import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// import { ChartModule } from 'angular-highcharts';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
declare var require: any;
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
