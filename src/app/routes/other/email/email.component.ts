import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BrandService } from '@brand';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnInit, OnDestroy {
  private brand$: Subscription;
  // Must be the same as `@email-sidebox-width`
  width = 250;
  menuVisible = false;
  type = 1;
  s = {
    pi: 1,
    ps: 10,
    q: ''
  };
  total = 50;
  list: any[];
  isChooseAll = false;

  get chooses(): any[] {
    return this.list.filter(w => w.selected === true);
  }

  get isChoosed() {
    return this.chooses.length > 0;
  }

  get chooseFull() {
    return this.chooses.length === this.list.length;
  }

  constructor(
    brand: BrandService,
    private cdRef: ChangeDetectorRef,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.brand$ = brand.notify
      .pipe(filter(() => !!this.list))
      .subscribe(() => this.cd());
  }

  private cd() {
    // wait checkbox
    setTimeout(() => this.cdRef.detectChanges());
  }

  ngOnInit() {
    this.load();
  }

  load(pi: number | 'next' = 1) {
    this.s.pi = pi === 'next' ? ++this.s.pi : pi;
    this.http.get('/email', this.s).subscribe((res: any) => {
      this.list = pi === 1 ? res.list : this.list.concat(res.list);
      this.total = res.total;
      this.cd();
    });
  }

  changeType(type: number) {
    if (type === this.type) return;
    this.type = type;
    console.log('new type', type);
  }

  choose(i: any) {
    if (typeof i === 'string') {
      this.chooseAll(false);
      switch (i) {
        case 'all':
          this.chooseAll(i === 'all');
          break;
        case 'read':
          this.list.filter(w => w.read).forEach(v => (v.selected = true));
          break;
        case 'unread':
          this.list.filter(w => !w.read).forEach(v => (v.selected = true));
          break;
        case 'starred':
          this.list.filter(w => w.star).forEach(v => (v.selected = true));
          break;
        case 'unstarred':
          this.list.filter(w => !w.star).forEach(v => (v.selected = true));
          break;
      }
    }
    this.cd();
  }

  chooseAll(value: boolean) {
    this.list.forEach(v => (v.selected = value));
    this.cd();
  }

  ngOnDestroy() {
    this.brand$.unsubscribe();
  }
}
