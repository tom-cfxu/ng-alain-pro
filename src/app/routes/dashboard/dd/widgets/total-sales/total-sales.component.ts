import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DDBaseWidget } from '../base.widget';

@Component({
  selector: 'dd-widget-total-sales',
  templateUrl: './total-sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDWidgetTotalSalesComponent extends DDBaseWidget {
  load(): Promise<void> {
    return Promise.resolve();
  }
}
