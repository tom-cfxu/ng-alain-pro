import { Component, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { UserStatus } from '../dist';

@Component({
  selector: 'app-sys-user',
  templateUrl: './user.component.html',
})
export class SysUserComponent {
  @ViewChild('st', { static: true })
  private st: STComponent;

  params: any = {};

  url = `/user-pro`;

  searchSchema: SFSchema = {
    properties: {
      q: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email', format: 'email' },
    },
  };

  columns: STColumn[] = [
    { title: 'ID', index: 'id' },
    {
      title: 'Name',
      index: 'name',
      type: 'link',
      click: (i: any) => `/sys/user/${i.id}`,
    },
    { title: 'Email', index: 'email' },
    { title: 'Latest activity', index: 'created', type: 'date' },
    { title: 'Verified', index: 'verified', type: 'yn' },
    { title: 'Role', index: 'role.text' },
    {
      title: 'Status',
      index: 'status',
      type: 'tag',
      tag: UserStatus,
    },
    {
      title: '',
      buttons: [
        {
          text: 'Edit',
          type: 'link',
          click: (i: any) => `/sys/user/edit/${i.id}`,
        },
        {
          text: 'More',
          children: [
            {
              text: 'View',
              type: 'link',
              click: (i: any) => `/sys/user/${i.id}`,
            },
            {
              text: 'Del',
              type: 'del',
              click: (i: any) =>
                this.http.delete(`${this.url}/${i.id}`).subscribe(() => {
                  this.msg.success('删除成功');
                  this.st.reset();
                }),
            },
          ],
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private msg: NzMessageService) {}
}
