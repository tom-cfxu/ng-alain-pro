import { NgModule } from '@angular/core';
import { TrendModule } from 'ngx-trend';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@shared';
import { ChartRoutingModule } from './chart-routing.module';

import { ChartG2Component } from './g2/g2.component';
import { ChartTrendComponent } from './trend/trend.component';
import { ChartNgxChartsComponent } from './ngx-charts/ngx-charts.component';
import { ChartNgxChartsBarComponent } from './ngx-charts/ngx-charts.bar.component';
import { ChartNgxChartsPieComponent } from './ngx-charts/ngx-charts.pie.component';
import { ChartNgxChartsLineComponent } from './ngx-charts/ngx-charts.line.component';
import { ChartNgxChartsAreaComponent } from './ngx-charts/ngx-charts.area.component';
import { ChartNgxChartsNumberCardComponent } from './ngx-charts/ngx-charts.number-card.component';
import { ChartMermaidComponent } from './mermaid/mermaid.component';
import { ChartGanttComponent } from './gantt/gantt.component';

const COMPONENTS = [
  ChartG2Component,
  ChartTrendComponent,
  ChartNgxChartsComponent,
  ChartNgxChartsBarComponent,
  ChartNgxChartsPieComponent,
  ChartNgxChartsLineComponent,
  ChartNgxChartsAreaComponent,
  ChartNgxChartsNumberCardComponent,
  ChartMermaidComponent,
  ChartGanttComponent,
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ChartRoutingModule,
    TrendModule,
    NgxChartsModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ChartModule {}
