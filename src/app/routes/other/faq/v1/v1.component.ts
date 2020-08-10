import { Component, Inject, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { BrandService } from '@brand';
import { _HttpClient } from '@delon/theme';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-faq-v1',
  templateUrl: './v1.component.html',
})
export class FAQV1Component implements OnInit {
  list: any[];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    public brand: BrandService,
    @Inject(DOCUMENT) private doc: any,
  ) {}

  ngOnInit() {
    this.http.get('/faq').subscribe((res: any[]) => (this.list = res));
  }

  to(idx: number) {
    const el = this.doc.querySelector(`#faq-panel-${idx}`);
    if (!el) return;
    el.scrollIntoView();
  }
}
