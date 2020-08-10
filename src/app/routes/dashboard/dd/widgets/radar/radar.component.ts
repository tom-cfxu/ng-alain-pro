import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DDBaseWidget } from '../base.widget';

@Component({
  selector: 'dd-widget-radar',
  templateUrl: './radar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDWidgetRadarComponent extends DDBaseWidget {
  data: any;
  load(): Promise<void> {
    return this.http
      .get(this.params.url)
      .toPromise()
      .then((res: any) => {
        this.data = res.radarData;
        this.cdr.detectChanges();
      });
  }
}
