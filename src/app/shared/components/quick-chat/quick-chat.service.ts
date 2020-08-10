import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export type QuickChatStatus = 'online' | 'offline';

@Injectable({ providedIn: 'root' })
export class QuickChatService implements OnDestroy {
  private url = 'wss://echo.websocket.org/?encoding=text';
  private _ws: WebSocketSubject<{}>;
  private $statusOrg = new Subject();
  private messageOrg$: Subscription;
  private $status = new Subject<QuickChatStatus>();
  private $message = new Subject<{}>();
  showDialog = true;

  constructor() {
    this.$statusOrg.subscribe((res: any) => {
      this.$status.next(res.type === 'open' ? 'online' : 'offline');
    });
  }

  get ws() {
    return this._ws;
  }

  get message() {
    return this.$message.asObservable();
  }

  get status() {
    return this.$status.asObservable();
  }

  open() {
    if (this._ws) return this._ws;

    this._ws = webSocket({
      url: this.url,
      serializer: (value: any) => JSON.stringify(value),
      deserializer: (e: MessageEvent) => {
        const res = JSON.parse(e.data);
        res.dir = 'left';
        res.mp = './assets/logo-color.svg';
        return res;
      },
      openObserver: this.$statusOrg,
      closeObserver: this.$statusOrg,
    });
    return this._ws;
  }

  close() {
    this.showDialog = false;
    if (this.messageOrg$) {
      this.messageOrg$.unsubscribe();
      this.messageOrg$ = null;
    }
  }

  send(msg: {}) {
    if (!this._ws) {
      this.open();
    }
    if (!this.messageOrg$) {
      this.messageOrg$ = this._ws.subscribe(res => this.$message.next(res));
    }
    this._ws.next(msg);
  }

  ngOnDestroy(): void {
    const { $statusOrg, $status, $message } = this;
    this.close();
    $statusOrg.complete();
    $status.complete();
    $message.complete();
  }
}
