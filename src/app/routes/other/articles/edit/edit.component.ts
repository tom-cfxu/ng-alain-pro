import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './edit.component.html',
})
export class ArticlesEditComponent implements OnInit {
  i: any;

  schema: SFSchema = {
    properties: {
      title: { type: 'string', title: 'Title', maxLength: 100 },
      tags: {
        type: 'string',
        title: 'Tags',
        enum: ['Angular', 'Node', 'HTML5', 'Less', '.net core'],
        ui: {
          widget: 'select',
          mode: 'tags',
        },
      },
      status: {
        type: 'string',
        title: 'Status',
        enum: ['Published', 'Draft', 'Deleted'],
      },
      content: {
        type: 'string',
        title: 'Content',
        ui: {
          widget: 'editor',
        },
      },
      img: {
        type: 'string',
        title: 'Main image',
        ui: {
          widget: 'img',
        },
      },
    },
    required: ['title', 'status', 'content', 'img'],
    ui: {},
  };

  constructor(
    public http: _HttpClient,
    private msg: NzMessageService,
    private modal: NzModalRef,
  ) {}

  ngOnInit() {
    this.i = {
        id: 0,
        status: 'Published',
        likes: 0,
        comments: 0,
      ...this.i,
    };
    if (this.i.id > 0) {
      this.http.get(`/article/${this.i.id}`).subscribe(res => (this.i = res));
    }
  }

  save(item: any) {
    this.http.post(`/article`, item).subscribe((res: any) => {
      this.msg.success('Success');
      this.modal.close(res);
    });
  }

  close() {
    this.modal.destroy();
  }
}
