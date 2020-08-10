import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { DDWidget } from './dd.types';
import { DDWidgetData } from './widgets/widget.data';

@Injectable({ providedIn: 'root' })
export class DashboardDDService {
  private _widgets: DDWidget[];

  get widgets() {
    return this._widgets ? of(this._widgets) : this.getByHttp();
  }

  get save() {
    return this.http.post('/dd', this._widgets);
  }

  constructor(private http: _HttpClient) {}

  private getByHttp() {
    return this.http.get('/dd').pipe(
      map((list: DDWidget[]) => {
        this._widgets = list.map(item => ({
          ...DDWidgetData[item.name],
          ...item,
        }));
        return this._widgets.filter(w => w.enabled);
      }),
    );
  }
}
