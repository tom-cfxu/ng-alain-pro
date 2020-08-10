import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, ScrollService } from '@delon/theme';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  s = {
    q: '',
    pi: 1,
    ps: 9,
  };
  total = 0;
  list: any[];
  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private scrollSrv: ScrollService,
  ) {}

  ngOnInit() {
    this.load(1);
  }

  load(pi = 1) {
    this.s.pi = pi;
    this.http.get('/course', this.s).subscribe((res: any) => {
      this.list = res.list;
      this.total = res.total;
      this.scrollSrv.scrollToTop();
      this.cd.detectChanges();
    });
  }
}
