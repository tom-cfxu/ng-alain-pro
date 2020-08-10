import { Component, ChangeDetectionStrategy } from '@angular/core';
import { single, multi } from './data';

@Component({
  selector: 'app-chart-ngx-charts-area',
  template: `
    <ngx-charts-area-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="multi"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [autoScale]="autoScale"
      (select)="onSelect($event)"
    >
    </ngx-charts-area-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartNgxChartsAreaComponent {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, { single, multi });
  }

  onSelect(event) {
    console.log(event);
  }
}
