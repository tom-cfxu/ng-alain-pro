import { Component, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { DDBaseWidget } from '../base.widget';

@Component({
  selector: 'dd-widget-effect',
  templateUrl: './effect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDWidgetEffectComponent extends DDBaseWidget {
  load(): Promise<void> {
    return Promise.resolve();
  }
}
