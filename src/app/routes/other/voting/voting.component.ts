import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingComponent implements OnInit {
  loading = false;
  list: any[];
  total = 0;
  s = {
    pi: 1,
    ps: 6,
  };
  constructor(
    public http: _HttpClient,
    private msg: NzMessageService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.load();
  }

  load(pi = 1) {
    this.s.pi = pi;
    this.loading = true;
    this.http.get('/voting', this.s).subscribe((res: any) => {
      this.loading = false;
      this.list = res.list;
      this.total = res.total;
      this.cd.detectChanges();
    });
  }

  voting(i: any, type: 'up' | 'down') {
    const voting = type === 'up' ? 1 : -1;
    this.loading = true;
    this.http.post('/voting', { id: i.id, voting }).subscribe(() => {
      this.msg.success('Success');
      this.loading = false;
      i.voting += voting;
      this.cd.detectChanges();
    });
  }
}
