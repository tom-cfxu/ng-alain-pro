import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, ScrollService, DrawerHelper } from '@delon/theme';
import { ClientsViewComponent } from './view/view.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit {
  s = {
    pi: 1,
    ps: 10,
    q: ''
  };
  total = 0;
  list: any[];

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private scroll: ScrollService,
    private drawerHelper: DrawerHelper,
  ) {}

  ngOnInit() {
    this.load();
  }

  load(pi = 1) {
    this.s.pi = pi;
    this.http.get('/client', this.s).subscribe((res: any) => {
      this.list = res.list;
      this.total = res.total;
      this.scroll.scrollToTop();
      this.cd.detectChanges();
    });
  }

  show(i: any) {
    this.drawerHelper
      .create(
        ``,
        ClientsViewComponent,
        { i },
        {
          size: 'sm',
          drawerOptions: {
            nzTitle: null,
            nzBodyStyle: {
              background: '#f8f8f8',
              'min-height': '100%',
              padding: 0,
            },
          },
        },
      )
      .subscribe();
  }
}
