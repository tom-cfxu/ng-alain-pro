import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { yuan } from '@shared';
import * as format from 'date-fns/format';

@Component({
  selector: 'app-g2',
  templateUrl: './g2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartG2Component implements OnInit {
  salesData: any[] = [];
  visitData: any[] = [];
  yuan = yuan;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    for (let i = 0; i < 12; i += 1) {
      this.salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      this.visitData.push({
        x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    this.cd.detectChanges();
  }
}
