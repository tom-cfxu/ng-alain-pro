import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DDBaseWidget } from '../base.widget';

@Component({
  selector: 'dd-widget-activities',
  templateUrl: './activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDWidgetActivitiesComponent extends DDBaseWidget {
  data: any;
  load(): Promise<void> {
    return this.http
      .get(this.params.url)
      .toPromise()
      .then((res: any) => {
        this.data = res.map((item: any) => {
          item.template = item.template
            .split(/@\{([^{}]*)\}/gi)
            .map((key: string) => {
              if (item[key]) return `<a>${item[key].name}</a>`;
              return key;
            });
          return item;
        });
        this.cdr.detectChanges();
      });
  }
}
