import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputNumber, InputBoolean } from '@delon/util';

import { ScrollbarDirective } from '../scrollbar/scrollbar.directive';
import { QuickChatService } from './quick-chat.service';

@Component({
  selector: 'quick-chat',
  templateUrl: './quick-chat.component.html',
  host: {
    '[class.quick-chat]': 'true',
    '[class.quick-chat__collapsed]': 'collapsed',
    '[class.d-none]': '!showDialog',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickChatComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  messages: any[] = [
    { type: 'only-text', msg: '2018-12-12' },
    {
      type: 'text',
      dir: 'left',
      mp: './assets/logo-color.svg',
      msg: '请<span class="text-success">一句话</span>描述您的问题，我们来帮您解决并转到合适的人工服务。😎',
    },
  ];
  text = '';
  inited: boolean;
  hasMessage = false;

  @ViewChild('messageScrollbar', { static: true }) messageScrollbar?: ScrollbarDirective;

  // #region fileds
  @Input() @InputNumber() height = 380;
  @Input() @InputNumber() @HostBinding('style.width.px') width = 320;
  @Input() @InputBoolean() collapsed = true;
  @Output() readonly collapsedChange = new EventEmitter<boolean>();
  @Output() readonly closed = new EventEmitter<boolean>();
  // #endregion

  constructor(private srv: QuickChatService, private cdr: ChangeDetectorRef) {}

  get showDialog() {
    return this.srv.showDialog;
  }

  private scrollToBottom() {
    this.cdr.detectChanges();
    setTimeout(() => this.messageScrollbar.scrollToBottom());
  }

  toggleCollapsed() {
    this.hasMessage = false;
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  close() {
    this.srv.close();
    this.closed.emit(true);
  }

  enterSend(e: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (e.keyCode !== 13) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.send();
  }

  send() {
    if (!this.text) return false;

    if (typeof this.inited === 'undefined') {
      this.inited = true;
    }
    const item = {
      type: 'text',
      msg: this.text,
      dir: 'right',
    };
    this.srv.send(item);
    this.messages.push(item);
    this.text = '';
    this.scrollToBottom();
    return false;
  }

  ngOnInit(): void {
    const { srv, messages, unsubscribe$ } = this;
    srv.message.pipe(takeUntil(unsubscribe$)).subscribe(res => {
      if (this.collapsed) {
        this.hasMessage = true;
      }
      messages.push(res);
      this.scrollToBottom();
    });
    srv.status.pipe(takeUntil(unsubscribe$)).subscribe(res => {
      this.inited = res === 'online' ? false : undefined;
    });
  }

  ngOnDestroy(): void {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
