import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { DashboardDDService } from '../dd.service';
import { DDWidget } from '../dd.types';

@Component({
  selector: 'app-dd-settings',
  templateUrl: './settings.component.html',
  host: {
    '[class.app-dd__settings]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDSettingsComponent implements OnInit {
  widgets: DDWidget[];
  loading = false;

  constructor(
    private modalRef: NzModalRef,
    private srv: DashboardDDService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.srv.widgets.subscribe(res => {
      this.widgets = res;
      this.cdr.markForCheck();
    });
  }

  ok() {
    this.loading = true;
    this.cdr.markForCheck();
    this.srv.save.subscribe(
      () => {
        this.modalRef.close(this.widgets);
      },
      () => {},
      () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    );
  }

  close() {
    this.modalRef.close();
  }
}
