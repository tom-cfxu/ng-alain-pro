import { Injectable } from '@angular/core';
import { LazyService } from '@delon/util';
import { _HttpClient } from '@delon/theme';

declare var jsPDF: any;

@Injectable({ providedIn: 'root' })
export class FilePdfService {
  readonly libs = ['https://cdn.bootcss.com/jspdf/1.5.3/jspdf.min.js'];

  constructor(private lazy: LazyService) {}

  get instance(): Promise<any> {
    return this.lazy.load(this.libs).then(() => new jsPDF());
  }
}
