// tslint:disable: unified-signatures

import { Injectable } from '@angular/core';
import { LazyService } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { saveAs } from 'file-saver';

declare var JSZip: any;
declare var docxtemplater: any;
declare var htmlDocx: any;

@Injectable({ providedIn: 'root' })
export class FileDocxService {
  readonly libs = [
    // docxtemplater
    'https://cdn.bootcss.com/docxtemplater/3.9.5/docxtemplater.min.js',
    'https://cdn.bootcss.com/jszip/2.6.1/jszip.js',
    // html-docx.js
    'https://unpkg.com/html-docx-js@0.3.1/dist/html-docx.js',
  ];

  constructor(private lazy: LazyService, private http: _HttpClient) {}

  private init() {
    return this.lazy.load(this.libs);
  }

  private toBinary(file: File): Promise<any> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsArrayBuffer(file);
    });
  }

  private getByHttp(url: string) {
    return this.http.get(url, null, { responseType: 'arraybuffer' }).toPromise();
  }

  async docxTemplate(file: string | File): Promise<any>;
  async docxTemplate(file: string | File, data: {}): Promise<void>;
  async docxTemplate(file: string | File, data: {}, outputFileName: string): Promise<void>;
  async docxTemplate(file: string | File, data: {} = null, outputFileName = 'output.docx') {
    await this.init();
    const content = typeof file === 'string' ? await this.getByHttp(file) : await this.toBinary(file);
    const zip = new JSZip(content);
    const doc = new docxtemplater().loadZip(zip);
    if (data == null) {
      return doc;
    }

    doc.setData(data);
    doc.render();
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    saveAs(out, outputFileName);
  }

  async htmlToDocx(html: string): Promise<void>;
  async htmlToDocx(html: string, options: {}): Promise<void>;
  async htmlToDocx(html: string, options: {}, outputFileName: string): Promise<void>;
  async htmlToDocx(html: string, options: {} = {}, outputFileName = 'output.docx'): Promise<void> {
    await this.init();
    const converted = htmlDocx.asBlob(html, {
      orientation: 'landscape',
      margins: { top: 720 },
      ...options,
    });
    saveAs(converted, outputFileName);
  }
}
