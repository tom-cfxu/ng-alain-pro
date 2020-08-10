import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuickChatService } from './quick-chat.service';

@Component({
  selector: 'quick-chat-status',
  templateUrl: './quick-chat-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickChatStatusComponent implements OnInit, OnDestroy {
  private status$: Subscription;

  status = 'default';

  constructor(private srv: QuickChatService, private cdr: ChangeDetectorRef) {
  }

  show() {
    if (this.srv.showDialog) return ;
    this.srv.showDialog = true;
  }

  ngOnInit() {
    this.status$ = this.srv.status.subscribe(res => {
      switch (res) {
        case 'online':
          this.status = 'success';
          break;
        default:
          this.status = 'default';
          break;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.status$.unsubscribe();
  }
}
