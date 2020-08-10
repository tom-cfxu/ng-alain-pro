import { Component, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { SFSchema, SFComponent, SFButton } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ec-ware',
  templateUrl: './list.component.html',
})
export class ECWareComponent {
  @ViewChild('st', { static: true }) private st: STComponent;
  @ViewChild('sf', { static: true }) private sf: SFComponent;

  params: any = {};

  url = `/ware`;

  searchSchema: SFSchema = {
    properties: {
      q: { type: 'string', title: 'Name' },
      outer_id: { type: 'string', title: 'Outer ID' },
      modified_start: {
        type: 'string',
        title: 'Modifiy time',
        ui: {
          widget: 'date',
          end: 'modified_end',
        },
      },
      modified_end: {
        type: 'string',
      },
      price: {
        type: 'number',
        title: 'Price',
        minimum: 0,
        maximum: 10000,
        ui: {
          widget: 'slider',
          range: true,
        },
      },
      stock: {
        type: 'number',
        title: 'Stock',
        minimum: 0,
        maximum: 10000,
        ui: {
          widget: 'slider',
          range: true,
        },
      },
    },
    ui: {
      grid: { md: 12, lg: 8 },
      spanLabelFixed: 120,
    },
  };

  btn: SFButton = {
    render: { grid: { span: 24 }, class: 'text-center mb0', spanLabelFixed: 0 },
    submit: 'Search',
  };

  columns: STColumn[] = [
    { title: 'Product Information', index: 'id', render: 'name' },
    { title: 'Outer ID', index: 'outer_id' },
    { title: 'Price', index: 'price', type: 'currency' },
    { title: 'Stock', index: 'stock', type: 'number' },
    { title: '30天销量', index: 'sale_num', type: 'number' },
    { title: '状态', index: 'status' },
    {
      title: 'OP',
      buttons: [
        {
          text: 'Delisting',
          iif: (i: any) => i.status === 'ON_SALE',
          pop: true,
          popTitle: '确认下架吗？',
          click: (i: any) => this.delisting(i.id),
        },
        {
          text: 'Edit',
          type: 'link',
          click: (i: any) => `/ec/ware/edit/${i.id}`,
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private msg: NzMessageService) {}

  delisting(id: number) {
    this.http.post(`${this.url}/delisting/${id}`).subscribe(() => {
      this.msg.success('下架成功');
      this.st.reset();
    });
  }
}
