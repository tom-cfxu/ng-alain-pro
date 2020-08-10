import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BrandService } from '../../pro.service';

@Component({
  selector: 'layout-pro-quick-panel',
  templateUrl: './quick-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProWidgetQuickPanelComponent implements OnInit {
  type = 0;
  data: any;
  get layout() {
    return this.pro.layout;
  }

  constructor(
    private pro: BrandService,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    public msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.http.get('/quick').subscribe(res => {
      this.data = res;
      this.changeType(0);
    });
  }

  changeType(type: number) {
    this.type = type;
    // wait checkbox & switch render
    setTimeout(() => this.cd.detectChanges());
  }

  updateSetting(type: string, value: any) {
    this.msg.success('Success!');
  }

  setLayout(name: string, value: any) {
    this.pro.setLayout(name, value);
  }
}
