import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';

import { WareEditService } from './edit.service';

@Component({
  selector: 'app-ec-ware-edit',
  templateUrl: './edit.component.html',
  viewProviders: [WareEditService],
})
export class ECWareEditComponent implements OnInit, OnDestroy {
  private route$: Subscription;
  id = 0;

  get i() {
    return this.srv.i;
  }

  constructor(
    private srv: WareEditService,
    private route: ActivatedRoute,
    private http: _HttpClient,
    private msg: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.srv.load(this.id);
    });
  }

  save() {
    this.http.post('/ware', this.srv.getSaveData()).subscribe(() => {
      this.msg.success('Save Success!');
      this.cancel();
    });
  }

  cancel() {
    this.router.navigateByUrl('/ec/ware');
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }
}
