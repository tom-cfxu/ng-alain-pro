import { TestBed, TestBedStatic } from '@angular/core/testing';
import { BrandService } from '@brand/pro.service';
import { filter } from 'rxjs/operators';

import { environment } from '@env/environment';

describe('pro: BrandService', () => {
  let injector: TestBedStatic;
  let srv: BrandService;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      providers: [BrandService],
    });
  });

  afterEach(() => ((environment as any).pro = null));

  describe('should be initialized configuration', () => {
    it('with default', () => {
      (environment as any).pro = null;
      spyOn(localStorage, 'getItem').and.returnValue(`null`);
      srv = injector.get(BrandService);
      expect(srv.theme).toBe('dark');
      expect(srv.menu).toBe('side');
      expect(srv.contentWidth).toBe('fluid');
    });
    it('with environment', () => {
      (environment as any).pro = { theme: 'light' };
      spyOn(localStorage, 'getItem').and.returnValue(`null`);
      srv = injector.get(BrandService);
      expect(srv.theme).toBe('light');
    });
    it('with settings', () => {
      (environment as any).pro = null;
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ theme: 'light', menu: 'top' }));
      srv = injector.get(BrandService);
      expect(srv.theme).toBe('light');
      expect(srv.menu).toBe('top');
    });
  });

  describe('should be trigger notify', () => {
    beforeEach(() => (srv = injector.get(BrandService)));

    it('when mobile changed in constructor', done => {
      srv.notify.pipe(filter(v => v != null && v === 'mobile')).subscribe(type => {
        expect(true).toBe(true);
        done();
      });
    });
    it('when layout changed', done => {
      srv.notify.pipe(filter(v => v != null && v === 'layout')).subscribe(type => {
        expect(true).toBe(true);
        done();
      });
      srv.setLayout('a', 1);
    });
  });

  it('#setCollapsed', () => {
    srv = injector.get(BrandService);
    srv.setCollapsed(false);
    expect(srv.collapsed).toBe(false);
    srv.setCollapsed();
    expect(srv.collapsed).toBe(true);
    srv.setCollapsed();
    expect(srv.collapsed).toBe(false);
  });

  it('should be onlyIcon always be false when menu is side', () => {
    srv = injector.get(BrandService);
    srv.setLayout('menu', 'top');
    srv.setLayout('onlyIcon', true);
    expect(srv.onlyIcon).toBe(true);
    srv.setLayout('menu', 'side');
    expect(srv.onlyIcon).toBe(false);
  });
});
