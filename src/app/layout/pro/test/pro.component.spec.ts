import { Component, ViewChild, DebugElement } from '@angular/core';
import { TestBed, TestBedStatic, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { configureTestSuite, createTestContext } from '@delon/testing';
import { AlainThemeModule } from '@delon/theme';

import { LayoutModule } from '../../layout.module';
import { BrandService } from '../pro.service';
import { LayoutProComponent } from '../pro.component';

describe('pro: layout-pro', () => {
  let injector: TestBedStatic;
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let srv: BrandService;
  let page: PageObject;

  configureTestSuite(() => {
    injector = TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        AlainThemeModule.forRoot(),
        LayoutModule,
        NgZorroAntdModule,
      ],
      declarations: [TestComponent],
    });
  });

  beforeEach(() => {
    ({ fixture, dl, context } = createTestContext(TestComponent));
    srv = injector.get(BrandService);
    page = new PageObject();
  });

  describe('should set the body style', () => {
    it('when inited', () => {
      srv.setCollapsed(true);
      srv.setLayout('theme', 'dark');
      fixture.detectChanges();
      page.checkBodyClass('alain-pro__dark').checkBodyClass('aside-collapsed');
    });
    it('when destroy', () => {
      srv.setCollapsed(true);
      srv.setLayout('theme', 'dark');
      fixture.detectChanges();
      page.checkBodyClass('alain-pro__dark').checkBodyClass('aside-collapsed');
      context.comp.ngOnDestroy();
      page.checkBodyClass('alain-pro__dark', false);
    });
    it('when layout changed', () => {
      srv.setLayout('contentWidth', 'fixed');
      fixture.detectChanges();
      page.checkBodyClass('alain-pro__wide');
      srv.setLayout('contentWidth', 'fluid');
      fixture.detectChanges();
      page.checkBodyClass('alain-pro__wide', false);
    });
  });

  describe('#layout', () => {
    it('should be hide slider when screen is mobile', () => {
      const siderCls = '.alain-pro__sider';
      const isMobile = spyOnProperty(srv, 'isMobile', 'get');
      // Show sider when not mobile
      isMobile.and.returnValue(false);
      srv.setCollapsed(true);
      fixture.detectChanges();
      fixture
        .whenStable()
        .then(() => {
          page.checkCls(siderCls, true);
          // Hide sider when is mobile
          isMobile.and.returnValue(true);
          srv.setCollapsed(true);
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          page.checkCls(siderCls, false);
        });
    });
  });

  class PageObject {
    checkBodyClass(cls: string, status = true): this {
      expect(document.body.classList.contains(cls)).toBe(status);
      return this;
    }
    checkCls(cls: string, status = true): this {
      const nodes = document.querySelectorAll(cls);
      if (status) {
        expect(nodes.length).toBe(1);
      } else {
        expect(nodes.length).toBe(0);
      }
      return this;
    }
  }
});

@Component({
  template: `
    <layout-pro #comp></layout-pro>
  `,
})
class TestComponent {
  @ViewChild('comp', { static: true }) comp: LayoutProComponent;
}
