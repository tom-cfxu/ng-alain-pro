import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent implements OnInit {
  i: any;

  @ViewChild('printEl', { static: false }) readonly printEl: ElementRef;

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private msg: NzMessageService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.http.get('/invoice').subscribe(res => {
      this.i = res;
      this.cd.detectChanges();
    });
  }

  print() {
    const el = this.printEl.nativeElement as HTMLDivElement;
    this.zone.runOutsideAngular(() => {
      const win = window.open('', 'Print', 'height=800,width=800');
      win.document.write(`<html><head><title>INVOICE #${this.i.id}</title></head><body></body></html>`);
      const head = win.document.querySelector('head');
      document.querySelectorAll('style, link').forEach(node => {
        head.appendChild(node.cloneNode(true));
      });
      // Force border color & text color
      const printStyle = win.document.createElement('style');
      printStyle.innerHTML = `*, .text-grey {
        border-color: #aaa !important;
        color: #000 !important;
      }`;
      head.appendChild(printStyle);
      win.document.querySelector('body').innerHTML = el.outerHTML;
      win.document.close();

      win.focus();

      // Waiting dom rendering to completed
      setTimeout(() => win.print(), 500);
    });
  }

  send() {
    this.msg.success('Send!');
  }
}
