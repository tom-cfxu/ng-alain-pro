import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-faq-v3',
  templateUrl: './v3.component.html',
  styleUrls: ['./v3.component.less'],
})
export class FAQV3Component implements OnInit {
  list: any[] = [];

  constructor(private http: _HttpClient) {}

  ngOnInit() {
    this.http.get('/faq').subscribe((res: any[]) => {
      this.list = res[0].children;
    });
  }
}
