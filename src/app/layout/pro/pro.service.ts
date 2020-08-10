import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SettingsService, Layout } from '@delon/theme';

import { environment } from '@env/environment';
import { ProLayout } from './pro.types';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private notify$ = new BehaviorSubject<string>(null);
  private _isMobile = false;

  // #region fields

  get notify() {
    return this.notify$.asObservable();
  }

  /**
   * Specify width of the sidebar, If you change it, muse be synchronize change less parameter:
   * ```less
   * @alain-pro-sider-menu-width: 256px;
   * ```
   */
  readonly width = 256;

  /**
   * Specify width of the sidebar after collapsed, If you change it, muse be synchronize change less parameter:
   * ```less
   * @menu-collapsed-width: 80px;
   * ```
   */
  readonly widthInCollapsed = 80;

  /**
   * Specify height of the header, If you change it, muse be synchronize change less parameter:
   * ```less
   * @alain-pro-header-height: 64px;
   * ```
   */
  readonly headerHeight = 64;

  /**
   * Specify distance from top for automatically hidden header
   */
  readonly autoHideHeaderTop = 300;

  get isMobile() {
    return this._isMobile;
  }

  get layout(): ProLayout {
    return this.settings.layout as ProLayout;
  }

  get collapsed() {
    return this.layout.collapsed;
  }

  get theme() {
    return this.layout.theme;
  }

  get menu() {
    return this.layout.menu;
  }

  get contentWidth() {
    return this.layout.contentWidth;
  }

  get fixedHeader() {
    return this.layout.fixedHeader;
  }

  get autoHideHeader() {
    return this.layout.autoHideHeader;
  }

  get fixSiderbar() {
    return this.layout.fixSiderbar;
  }

  get onlyIcon() {
    return this.menu === 'side' ? false : this.layout.onlyIcon;
  }

  /** Whether the top menu */
  get isTopMenu() {
    return this.menu === 'top' && !this.isMobile;
  }

  /** Whether the side menu */
  get isSideMenu() {
    return this.menu === 'side' && !this.isMobile;
  }

  /** Whether the fixed content */
  get isFixed() {
    return this.contentWidth === 'fixed';
  }

  // #endregion

  constructor(bm: BreakpointObserver, private settings: SettingsService) {
    // fix layout data
    settings.setLayout(
      {
        theme: 'dark',
        menu: 'side',
        contentWidth: 'fluid',
        fixedHeader: false,
        autoHideHeader: false,
        fixSiderbar: false,
        onlyIcon: true,
        ...(environment as any).pro,
        ...settings.layout,
      }
    );

    const mobileMedia = 'only screen and (max-width: 767.99px)';
    bm.observe(mobileMedia).subscribe(state => this.checkMedia(state.matches));
    this.checkMedia(bm.isMatched(mobileMedia));
  }

  private checkMedia(value: boolean) {
    this._isMobile = value;
    this.layout.collapsed = this._isMobile;
    this.notify$.next('mobile');
  }

  setLayout(name: string | Layout, value?: any) {
    this.settings.setLayout(name, value);
    this.notify$.next('layout');
  }

  setCollapsed(status?: boolean) {
    this.setLayout('collapsed', typeof status !== 'undefined' ? status : !this.collapsed);
  }
}
