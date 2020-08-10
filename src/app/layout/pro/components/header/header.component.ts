import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, combineLatest } from 'rxjs';
import { throttleTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { BrandService } from '../../pro.service';

@Component({
  selector: 'layout-pro-header',
  templateUrl: './header.component.html',
  host: {
    '[class.ant-layout-header]': 'true',
    '[class.alain-pro__header-fixed]': 'pro.fixedHeader',
    '[class.alain-pro__header-hide]': 'hideHeader',
    '[style.padding.px]': '0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  hideHeader = false;

  @HostBinding('style.width')
  get getHeadWidth() {
    const { isMobile, fixedHeader, menu, collapsed, width, widthInCollapsed } = this.pro;
    if (isMobile || !fixedHeader || menu === 'top') {
      return '100%';
    }
    return collapsed ? `calc(100% - ${widthInCollapsed}px)` : `calc(100% - ${width}px)`;
  }

  constructor(
    public pro: BrandService,
    @Inject(DOCUMENT) private doc: any,
    private cdr: ChangeDetectorRef
  ) { }

  private handScroll = () => {
    if (!this.pro.autoHideHeader) {
      this.hideHeader = false;
      return;
    }
    setTimeout(() => {
      this.hideHeader = this.doc.body.scrollTop + this.doc.documentElement.scrollTop > this.pro.autoHideHeaderTop;
    });
  }

  ngOnInit() {
    combineLatest(
      this.pro.notify.pipe(tap(() => this.cdr.markForCheck())),
      fromEvent(window, 'scroll', { passive: false }).pipe(
        throttleTime(50),
        distinctUntilChanged(),
      )
    ).pipe(takeUntil(this.unsubscribe$)).subscribe(this.handScroll);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
