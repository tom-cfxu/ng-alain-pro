// #region exports

export * from './pro.types';
export * from './pro.service';
export { LayoutProComponent } from './pro.component';

// #endregion

// #region widgets

import { LayoutProHeaderWidgetComponent } from './components/widget/widget.component';
import { LayoutProWidgetNotifyComponent } from './components/notify/notify.component';
import { LayoutProWidgetSearchComponent } from './components/search/search.component';
import { LayoutProWidgetUserComponent } from './components/user/user.component';
import { LayoutProWidgetQuickComponent } from './components/quick/quick.component';

const PRO_WIDGETS = [
  LayoutProHeaderWidgetComponent,
  LayoutProWidgetNotifyComponent,
  LayoutProWidgetSearchComponent,
  LayoutProWidgetUserComponent,
  LayoutProWidgetQuickComponent,
];

// #endregion

// #region entry components

import { ProSettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { LayoutProWidgetQuickPanelComponent } from './components/quick/quick-panel.component';

export const PRO_ENTRYCOMPONENTS = [
  ProSettingDrawerComponent,
  LayoutProWidgetQuickPanelComponent,
];

// #endregion

// #region components

import { LayoutProComponent } from './pro.component';
import { LayoutProMenuComponent } from './components/menu/menu.component';
import { LayoutProLogoComponent } from './components/logo/logo.component';
import { LayoutProHeaderComponent } from './components/header/header.component';
import { LayoutProFooterComponent } from './components/footer/footer.component';

export const PRO_COMPONENTS = [
  LayoutProComponent,
  LayoutProMenuComponent,
  LayoutProLogoComponent,
  LayoutProHeaderComponent,
  LayoutProFooterComponent,
  ...PRO_ENTRYCOMPONENTS,
  ...PRO_WIDGETS,
];

// #endregion

// #region shared components

import { ProPageGridComponent } from './components/page-grid/page-grid.component';
import { ProPageHeaderWrapperComponent } from './components/page-header-wrapper/page-header-wrapper.component';
export const PRO_SHARED_COMPONENTS = [
  ProPageGridComponent,
  ProPageHeaderWrapperComponent,
];

// #endregion
