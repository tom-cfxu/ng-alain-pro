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
  selector: 'app-calendar-list-view',
  templateUrl: './list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarListViewComponent extends CalendarTheme implements OnInit, OnDestroy {

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
    this.options = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridDay,listWeek',
      },
      defaultView: 'listWeek',
      height: 900,
    };
    this.init();
    this.loadEvents(new Date());
  }

  ngOnDestroy() {
    this.destroy();
  }
}
