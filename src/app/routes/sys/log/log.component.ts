import { Component, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema, SFComponent } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sys-log',
  templateUrl: './log.component.html',
})
export class SysLogComponent {
  @ViewChild('st', { static: true })
  private st: STComponent;

  @ViewChild('sf', { static: true })
  private sf: SFComponent;

  params: any = {};

  url = `/log`;

  searchSchema: SFSchema = {
    properties: {
      q: { type: 'string', title: '标题' },
    },
  };

  columns: STColumn[] = [
    {
      title: 'Level',
      index: 'level',
      type: 'tag',
      tag: {
        error: { text: '异常', color: 'red' },
        warning: { text: '警告', color: 'orange' },
        info: { text: '信息' },
      },
    },
    { title: 'Title', index: 'title' },
    { title: 'Name', index: 'name' },
    { title: 'Created', index: 'created', type: 'date' },
    {
      title: '',
      buttons: [
        {
          text: 'Del',
          type: 'del',
          click: (i: any) => this.del(i.id),
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private msg: NzMessageService) {}

  del(id = 0) {
    this.http.delete(this.url, { q: this.sf.value.q || '', id }).subscribe(() => {
      this.msg.success('删除成功');
      this.st.reset();
    });
    return false;
  }
}
