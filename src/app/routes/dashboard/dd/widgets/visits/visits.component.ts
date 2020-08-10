import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DDBaseWidget } from '../base.widget';

@Component({
  selector: 'dd-widget-visits',
  templateUrl: './visits.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDWidgetVisitsComponent extends DDBaseWidget {
  data: any;
  load(): Promise<void> {
    return this.http
      .get(this.params.url)
      .toPromise()
      .then((res: any) => {
        this.data = res.visitData;
        this.cdr.detectChanges();
      });
  }
}
