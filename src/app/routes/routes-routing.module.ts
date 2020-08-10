import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutProComponent } from '@brand';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
import { DashboardDDComponent } from './dashboard/dd/dd.component';
import { DashboardRealtimeDataMonitorComponent } from './dashboard/realtime-data-monitor/realtime-data-monitor.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserLockComponent } from './passport/lock/lock.component';
// single pages
import { UserLogin2Component } from './passport/login2/login2.component';
import { UserLogin3Component } from './passport/login3/login3.component';
import { CallbackComponent } from './callback/callback.component';
//leakage analysis page 
import { LeakageAnalysisComponent } from './leakage-analysis/leakage-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'dashboard/analysis', pathMatch: 'full' },
      {
        path: 'dashboard',
        redirectTo: 'dashboard/analysis',
        pathMatch: 'full',
      },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'dashboard/monitor', component: DashboardMonitorComponent },
      { path: 'dashboard/real-data-monitor', component: DashboardRealtimeDataMonitorComponent },
      { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
      { path: 'dashboard/dd', component: DashboardDDComponent },
      { path: 'leakage-analysis', component: LeakageAnalysisComponent },
      { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
      { path: 'sys', loadChildren: './sys/sys.module#SysModule' },
      { path: 'ec', loadChildren: './ec/ec.module#ECModule' },
      { path: 'map', loadChildren: './map/map.module#MapModule' },
      { path: 'chart', loadChildren: './chart/chart.module#ChartModule' },
      { path: 'other', loadChildren: './other/other.module#OtherModule' },
      { path: 'file', loadChildren: './file/file.module#FileModule' },
      // Exception
      {
        path: 'exception',
        loadChildren: './exception/exception.module#ExceptionModule',
      },
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'login2', component: UserLogin2Component },
  { path: 'login3', component: UserLogin3Component },
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
