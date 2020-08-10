import { Component, ChangeDetectionStrategy, NgZone, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { LazyService, copy } from '@delon/util';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { BrandService } from '../pro.service';
import { ProLayout } from '../pro.types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pro-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.setting-drawer]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProSettingDrawerComponent {
  private loadedLess = false;

  get layout() {
    return this.brand.layout;
  }

  collapse = false;

  themes = [
    {
      key: 'dark',
      title: 'app.setting.pagestyle.dark',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
    },
    {
      key: 'light',
      title: 'app.setting.pagestyle.light',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
    },
  ];

  color = '#2F54EB';
  colors = [
    {
      key: 'dust',
      color: '#F5222D',
    },
    {
      key: 'volcano',
      color: '#FA541C',
    },
    {
      key: 'sunset',
      color: '#FAAD14',
    },
    {
      key: 'cyan',
      color: '#13C2C2',
    },
    {
      key: 'green',
      color: '#52C41A',
    },
    {
      key: 'daybreak',
      color: '#1890ff',
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
    },
    {
      key: 'purple',
      color: '#722ED1',
    },
  ];

  menuModes = [
    {
      key: 'side',
      title: 'app.setting.sidemenu',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
    },
    {
      key: 'top',
      title: 'app.setting.topmenu',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
    },
  ];

  contentWidths = [
    {
      key: 'fixed',
      title: 'app.setting.content-width.fixed',
      disabled: false,
    },
    {
      key: 'fluid',
      title: 'app.setting.content-width.fluid',
      disabled: false,
    },
  ];

  constructor(
    public brand: BrandService,
    private cd: ChangeDetectorRef,
    private msg: NzMessageService,
    private lazy: LazyService,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: any,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
  ) {
    this.setLayout('menu', this.brand.menu, false);
  }

  private loadLess(): Promise<void> {
    if (this.loadedLess) {
      return Promise.resolve();
    }
    return this.lazy
      .loadStyle('./assets/alain-pro.less', 'stylesheet/less')
      .then(() => {
        const lessConfigNode = this.doc.createElement('script');
        lessConfigNode.innerHTML = `
          window.less = {
            async: true,
            env: 'production',
            javascriptEnabled: true
          };
        `;
        this.doc.body.appendChild(lessConfigNode);
      })
      .then(() => this.lazy.loadScript('https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'))
      .then(() => {
        this.loadedLess = true;
      });
  }

  private runLess() {
    const { color, zone, msg, cd } = this;
    const msgId = msg.loading(`正在编译主题！`, { nzDuration: 0 }).messageId;
    setTimeout(() => {
      zone.runOutsideAngular(() => {
        this.loadLess().then(() => {
          (window as any).less
            .modifyVars({
              [`@primary-color`]: color,
            })
            .then(() => {
              msg.success('成功');
              msg.remove(msgId);
              zone.run(() => cd.detectChanges());
            });
        });
      });
    }, 200);
  }

  toggle() {
    this.collapse = !this.collapse;
  }

  changeColor(color: string) {
    this.color = color;
    this.runLess();
  }

  setLayout(name: string, value: any, cd = true) {
    switch (name) {
      case 'menu':
        const isTop = value === 'top';
        this.contentWidths.find(w => w.key === 'fixed').disabled = !isTop;
        const newLayout = {
          ...this.brand.layout,
          contentWidth: isTop ? 'fixed' : 'fluid',
          onlyIcon: isTop,
          collapsed: isTop && !this.brand.isMobile ? false : this.brand.layout.collapsed,
        };
        this.brand.setLayout(newLayout);
        break;
      case 'fixedHeader':
        this.brand.setLayout('autoHideHeader', false);
        break;
      default:
        break;
    }
    this.brand.setLayout(name, value);
    if (cd) {
      setTimeout(() => {
        // Re-render G2 muse be trigger window resize
        window.dispatchEvent(new Event('resize'));
        this.cd.markForCheck();
      });
    }
  }

  copy() {
    const { color, layout } = this;
    const vars = {
      [`@primary-color`]: color,
    };
    const colorVars = Object.keys(vars)
      .map(key => `${key}: ${vars[key]};`)
      .join('\n');
    const layoutVars = Object.keys(layout)
      .filter(
        key =>
          // tslint:disable-next-line:no-bitwise
          ~[
            'theme',
            'menu',
            'contentWidth',
            'fixedHeader',
            'autoHideHeader',
            'fixSiderbar',
            'colorWeak',
            'onlyIcon',
          ].indexOf(key),
      )
      .map(key => {
        const value = layout[key];
        if (typeof value === 'boolean') {
          return `    ${key}: ${value},`;
        } else {
          return `    ${key}: '${value}',`;
        }
      })
      .join('\n');
    copy(this.i18n.fanyi('app.setting.copy.result', { colorVars, layoutVars }));
    this.msg.success(this.i18n.fanyi('app.setting.copyinfo'));
  }
}
