import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-faq-v2',
  templateUrl: './v2.component.html',
})
export class FAQV2Component implements OnInit {
  leftList: any[] = [];
  rightList: any[] = [];
  primaryList: any[];

  constructor(private http: _HttpClient) {}

  ngOnInit() {
    this.http.get('/faq').subscribe((res: any[]) => {
      this.primaryList = res.filter(w => w.primary).map(i => ({ icon: i.icon, title: i.title }));
      this.change(this.primaryList[0]);
      res.forEach((i, idx) => this[idx % 2 === 0 ? 'leftList' : 'rightList'].push(i));
    });
  }

  change(i: any) {
    // tslint:disable-next-line: no-shadowed-variable
    this.primaryList.forEach(i => (i.selected = false));
    i.selected = true;
  }
}
