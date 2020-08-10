import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
import { DashboardDDComponent } from './dashboard/dd/dd.component';
import { DashboardDDWidgets } from './dashboard/dd/index';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserLockComponent } from './passport/lock/lock.component';
// single pages
import { UserLogin2Component } from './passport/login2/login2.component';
import { UserLogin3Component } from './passport/login3/login3.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardRealtimeDataMonitorComponent } from './dashboard/realtime-data-monitor/realtime-data-monitor.component';
import { LeakageAnalysisComponent } from './leakage-analysis/leakage-analysis.component';
// #NgxEchartsModule
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

const COMPONENTS = [
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  DashboardDDComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  UserLockComponent,
  // single pages
  UserLogin2Component,
  UserLogin3Component,
  CallbackComponent
];
const COMPONENTS_NOROUNT = [
  ...DashboardDDWidgets
];

@NgModule({
  imports: [SharedModule,
    NgxEchartsModule.forRoot({
      echarts,
    }), RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT, DashboardRealtimeDataMonitorComponent, LeakageAnalysisComponent],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
