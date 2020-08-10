import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent implements OnInit {
  i: any;
  _type = false;
  type = 'mo';

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    public msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.http.get('/pricing').subscribe((res: any) => {
      this.i = res;
      this.cd.detectChanges();
    });
  }

  typeChange(res: boolean) {
    this.type = res ? 'yr' : 'mo';
  }
}
