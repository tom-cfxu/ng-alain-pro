import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
  OnInit,
  Inject,
} from '@angular/core';
import { _HttpClient, ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { CalendarTheme } from '../calendar.theme';

@Component({
  selector: 'app-calendar-basic',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBasicComponent extends CalendarTheme implements OnInit, OnDestroy {

  constructor(private http: _HttpClient, zone: NgZone, @Inject(ALAIN_I18N_TOKEN) i18n: I18NService) {
    super(zone, i18n);
  }

  private loadEvents(time: Date) {
    this.http.get(`/calendar?time=${+time}`).subscribe((res: any) => {
      this._executeOnStable(() => {
        this.instance.addEventSource({
          allDayDefault: true,
          events: res,
        });
      });
    });
  }

  ngOnInit() {
    this.init();
    this.loadEvents(new Date());
  }

  ngOnDestroy() {
    this.destroy();
  }
}
