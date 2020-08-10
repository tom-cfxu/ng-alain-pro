import { Component, ViewChild, DebugElement } from '@angular/core';
import { TestBed, TestBedStatic, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { configureTestSuite, createTestContext } from '@delon/testing';
import { AlainThemeModule, MenuService, Menu } from '@delon/theme';

import { LayoutModule } from '../../../layout.module';
import { BrandService } from '@brand';
import { LayoutProMenuComponent } from '@brand/components/menu/menu.component';
import { Router } from '@angular/router';

describe('pro: layout-pro-menu', () => {
  let injector: TestBedStatic;
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let srv: BrandService;
  let menuSrv: MenuService;
  let page: PageObject;

  configureTestSuite(() => {
    injector = TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
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
    menuSrv = injector.get(MenuService);
    page = new PageObject();
  });

  describe('#menu', () => {
    it('should be ingored category menus', () => {
      page.appendMenu([{ text: '1', children: [{ text: '1-1' }, { text: '1-2' }] }]).checkCount(2);
    });

    it('should be ingored menu item when _hidden is true', () => {
      page.appendMenu([{ text: '1', children: [{ text: '1-1', hide: true }, { text: '1-2' }] }]).checkCount(1);
    });

    it('should be navigate router', fakeAsync(() => {
      const router = injector.get(Router) as Router;
      spyOn(router, 'navigateByUrl');
      page.appendMenu([{ text: '1', children: [{ text: '1-1', link: '/' }] }]).click();
      tick(100);
      fixture.detectChanges();
      expect(router.navigateByUrl).toHaveBeenCalled();
    }));

    it('should be auto closed collapse when router changed of mobile', fakeAsync(() => {
      spyOnProperty(srv, 'isMobile').and.returnValue(true);
      const setCollapsedSpy = spyOn(srv, 'setCollapsed');
      page.appendMenu([{ text: '1', children: [{ text: '1-1', link: '/' }] }]).click();
      tick(100);
      fixture.detectChanges();
      expect(setCollapsedSpy).toHaveBeenCalled();
      expect(setCollapsedSpy.calls.mostRecent().args[0]).toBe(true);
    }));
  });

  class PageObject {
    appendMenu(menus: Menu[]) {
      menuSrv.add(menus);
      fixture.detectChanges();
      return this;
    }
    checkCount(count = 0) {
      expect(context.comp.menus.length).toBe(count);
      return this;
    }
    click(pos = 0) {
      const el = document.querySelectorAll('.alain-pro__menu-item')[pos] as HTMLElement;
      el.querySelector('a').click();
      fixture.detectChanges();
      return this;
    }
    whenStable() {
      return fixture.whenStable();
    }
  }
});

@Component({
  template: `
    <div layout-pro-menu></div>
  `,
})
class TestComponent {
  @ViewChild(LayoutProMenuComponent, { static: true }) comp: LayoutProMenuComponent;
}
