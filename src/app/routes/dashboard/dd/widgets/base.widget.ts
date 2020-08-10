import { Input, Inject, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DashboardDDContainerComponent } from './container.component';

export abstract class DDBaseWidget {
  @Input() params?: any;

  abstract load(): Promise<void>;

  constructor(
    @Inject(_HttpClient) protected readonly http: _HttpClient,
    @Inject(ChangeDetectorRef) protected readonly cdr: ChangeDetectorRef,
    @Inject(DashboardDDContainerComponent)
    protected readonly containerComp: DashboardDDContainerComponent,
    @Inject(NzMessageService) public readonly msg: NzMessageService,
  ) {}
}
