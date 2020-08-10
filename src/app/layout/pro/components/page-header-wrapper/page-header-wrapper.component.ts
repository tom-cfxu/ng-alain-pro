import { Component, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { InputBoolean } from '@delon/util';
import { PageHeaderConfig } from '@delon/abc';
import { BrandService } from '../../pro.service';

@Component({
  selector: 'page-header-wrapper',
  templateUrl: './page-header-wrapper.component.html',
  host: {
    '[class.alain-pro__page-header-wrapper]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProPageHeaderWrapperComponent {
  // #region page-header fields

  @Input() title: string | TemplateRef<void>;
  @Input() @InputBoolean() loading = false;
  @Input() home: string;
  @Input() homeLink: string;
  @Input() homeI18n: string;
  /**
   * 自动生成导航，以当前路由从主菜单中定位
   */
  @Input() @InputBoolean() autoBreadcrumb = true;
  /**
   * 自动生成标题，以当前路由从主菜单中定位
   */
  @Input() @InputBoolean() autoTitle = true;
  /**
   * 是否自动将标题同步至 `TitleService`、`ReuseService` 下，仅 `title` 为 `string` 类型时有效
   */
  @Input() @InputBoolean() syncTitle = true;
  @Input() breadcrumb: TemplateRef<void>;
  @Input() logo: TemplateRef<void>;
  @Input() action: TemplateRef<void>;
  @Input() content: TemplateRef<void>;
  @Input() extra: TemplateRef<void>;
  @Input() tab: TemplateRef<void>;
  @Input() phContent: TemplateRef<void>;
  // #endregion

  // #region fields

  @Input() top: TemplateRef<void>;
  @Input() @InputBoolean() noSpacing = false;
  @Input() style: {};

  // #endregion

  constructor(public pro: BrandService, cog: PageHeaderConfig) {
    Object.assign(this, cog, { syncTitle: true });
  }
}
