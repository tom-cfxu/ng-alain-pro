import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { _HttpClient, ScrollService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './thread.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumThreadComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  s = {
    pi: 1,
    ps: 10,
  };
  id = 0;
  i: any;

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef,
    private scroll: ScrollService
  ) {}

  ngOnInit() {
    this.router$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  load(pi = 1) {
    this.s.pi = pi;
    this.http.get(`/forum/thread/${this.id}`, this.s).subscribe((res: any) => {
      this.i = res;
      this.scroll.scrollToTop();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
