import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';

// #region mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCK_MODULES = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : [];
// #endregion

// #region reuse-tab
/**
 * Pls refer to [reuse-tab](https://ng-alain.com/components/reuse-tab).
 */
import { RouteReuseStrategy } from '@angular/router';
import { ReuseTabService, ReuseTabStrategy, ReuseTabMatchMode } from '@delon/abc/reuse-tab';
const REUSETAB_PROVIDES = [
  {
    provide: RouteReuseStrategy,
    useClass: ReuseTabStrategy,
    deps: [ReuseTabService],
  },
];
// #endregion

// #region global config functions

import { PageHeaderConfig } from '@delon/abc';
export function fnPageHeaderConfig(): PageHeaderConfig {
  return Object.assign(new PageHeaderConfig(), { homeI18n: 'home', recursiveBreadcrumb: true });
}

import { DelonAuthConfig } from '@delon/auth';
export function fnDelonAuthConfig(): DelonAuthConfig {
  return {
    ...new DelonAuthConfig(),
    login_url: '/passport/login',
  };
}

// tslint:disable-next-line: no-duplicate-imports
import { STConfig } from '@delon/abc';
export function fnSTConfig(): STConfig {
  return {
    ...new STConfig(),
    modal: { size: 'lg' },
  };
}

const GLOBAL_CONFIG_PROVIDES = [
  // NOTICE: @delon/abc global configuration
  { provide: STConfig, useFactory: fnSTConfig },
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
  { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
];

// #endregion

@NgModule({
  imports: [
    AlainThemeModule.forRoot(),
    DelonACLModule.forRoot(),
    // mock
    ...MOCK_MODULES,
  ],
})
export class DelonModule {
  constructor(@Optional() @SkipSelf() parentModule: DelonModule, reuseTabService: ReuseTabService) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
    // NOTICE: Only valid for menus with reuse property
    // Pls refer to the E-Mail demo effect
    reuseTabService.mode = ReuseTabMatchMode.MenuForce;
    // Shouled be trigger init, you can ingore when used `reuse-tab` component in layout component
    reuseTabService.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES],
    };
  }
}
