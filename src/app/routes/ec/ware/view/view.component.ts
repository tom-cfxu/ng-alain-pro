import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ec-ware-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ECWareViewComponent implements OnInit, OnDestroy {
  private route$: Subscription;
  id = 0;
  i: any = {};
  tab = 0;

  getValidName(values: string[]) {
    return values.filter(w => !!w);
  }

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  private load() {
    this.http.get(`/ware/${this.id}`).subscribe((res: any) => {
      res.skus = res.skus || [];
      if (res.skus.length > 0) {
        res.properieNames = res.skus[0].attributes.split(':').map(v => +v).filter(v => v !== 0);
      }
      this.i = res;
      this.cd.detectChanges();
    });
  }

  status(status: string) {
    this.http
      .post(`/ware/status`, {
        id: this.id,
        status,
      })
      .subscribe((res: any) => {
        this.msg.success(
          `${res.item.status === 'CUSTORMER_DOWN' ? '下' : '上'}架成功`,
        );
        this.cd.detectChanges();
      });
  }

  cancel() {
    this.router.navigateByUrl('/ec/ware');
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
