import { Component, ChangeDetectionStrategy } from '@angular/core';
import { single, multi } from './data';

@Component({
  selector: 'app-chart-ngx-charts-number-card',
  template: `
    <ngx-charts-number-card
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      (select)="onSelect($event)"
    >
    </ngx-charts-number-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartNgxChartsNumberCardComponent {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }
}
