import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange } from '@delon/abc';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingComponent {
  @ViewChild('st', { static: true })
  private st: STComponent;

  params: any = {};

  url = `/billing`;

  columns: STColumn[] = [
    {
      title: 'ID',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: 'Rejected',
          select: (data: any[]) => data.forEach(item => (item.checked = item.status === 'Rejected')),
        },
        {
          text: 'Pending',
          select: (data: any[]) => data.forEach(item => (item.checked = item.status === 'Pending')),
        },
        {
          text: 'Completed',
          select: (data: any[]) => data.forEach(item => (item.checked = item.status === 'Completed')),
        },
      ],
    },
    { title: 'ORDER', index: 'order' },
    { title: 'CLIENT', index: 'client' },
    { title: 'AMOUNT', index: 'amount', type: 'currency' },
    { title: 'DATE', index: 'date', type: 'date', dateFormat: 'DD MMM' },
    { title: 'STATUS', index: 'status', render: 'status' },
  ];

  constructor(public msg: NzMessageService) {}
}
