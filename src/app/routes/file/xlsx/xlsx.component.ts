import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { XlsxService } from '@delon/abc';

@Component({
  selector: 'file-xlsx',
  templateUrl: './xlsx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileXlsxComponent {
  constructor(private xlsx: XlsxService, private cdr: ChangeDetectorRef) {}
  data: any;

  render = (res: any) => {
    this.data = res;
    this.cdr.detectChanges();
  };

  url() {
    this.xlsx.import(`./assets/tmp/demo.xlsx`).then(this.render);
  }

  change(e: Event) {
    const node = e.target as HTMLInputElement;
    this.xlsx.import(node.files[0]).then(this.render);
    node.value = '';
  }
}
