import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileDocxService } from './docx.service';

@Component({
  selector: 'file-docx',
  templateUrl: './docx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDocxComponent {
  result: string;
  type = 1;
  data = `{
  "name": "cipchk",
  "email": "cipchk@qq.com",
  "description": "1234567890中文",
  "products": [
    {
      "title": "华为",
      "price": 10000
    },
    {
      "title": "小米",
      "price": 999
    }
  ]
}`;
  url = './assets/tmp/docx.docx';
  file: File;
  html = ``;

  constructor(private docxSrv: FileDocxService) {}

  onChange(e: Event) {
    this.file = (e.target as HTMLInputElement).files[0];
  }

  output() {
    const { type, file, url, data } = this;
    this.docxSrv.docxTemplate(type === 1 ? url : file, JSON.parse(data));
  }

  htmlToDocx() {
    this.docxSrv.htmlToDocx(this.html);
  }
}
