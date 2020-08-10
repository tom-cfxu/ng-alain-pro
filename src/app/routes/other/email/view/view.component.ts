import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailViewComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  menuVisible = false;
  id = 0;
  i: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    public msg: NzMessageService,
    private loc: Location,
  ) {}

  ngOnInit() {
    this.router$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  load() {
    this.http.get(`/email/${this.id}`).subscribe(
      (res: any) => {
        this.i = res;
        this.cd.detectChanges();
      },
      () => this.router.navigateByUrl(`/other/email`)
    );
  }

  back() {
    this.loc.back();
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
