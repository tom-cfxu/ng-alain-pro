import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  list: any[];
  constructor(private http: _HttpClient, private msg: NzMessageService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get('/project').subscribe((res: any) => {
      this.list = res;
      this.cd.detectChanges();
    });
  }

  del(i: any, idx: number) {
    this.http.delete('/project', { id: i.id }).subscribe(() => {
      this.msg.success('Success');
      this.list.splice(idx, 1);
      this.cd.detectChanges();
    });
  }
}
