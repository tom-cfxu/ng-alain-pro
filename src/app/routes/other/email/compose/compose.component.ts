import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-email-compose',
  templateUrl: './compose.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComposeComponent {
  menuVisible = false;
  item: any = {};
  schema: SFSchema = {
    properties: {
      to: {
        type: 'string',
        title: 'To',
        format: 'email',
      },
      subject: {
        type: 'string',
        title: 'Subject',
        maxLength: 100,
      },
      content: {
        type: 'string',
        title: '',
        ui: {
          widget: 'editor'
        }
      },
    },
    required: ['to', 'subject', 'content'],
  };

  constructor(private msg: NzMessageService, private router: Router) {}

  save(item: any) {
    console.log(item);
    this.msg.success('Success');
    this.router.navigateByUrl('/other/email');
  }
}
