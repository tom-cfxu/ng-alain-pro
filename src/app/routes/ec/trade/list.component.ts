import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, DrawerHelper } from '@delon/theme';
import { SFSchema, SFButton } from '@delon/form';
import { ECTradeMemoComponent } from './memo.component';
import { ECTradeViewComponent } from './view.component';

@Component({
  selector: 'app-ec-trade',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ECTradeComponent implements OnInit {
  statusIndex = 2;

  loading = false;
  params: any = {
    pi: 1,
    ps: 6,
  };
  list: any[] = [];
  total = 0;

  searchSchema: SFSchema = {
    properties: {
      id: { type: 'number', title: '订单号' },
      ware_id: { type: 'number', title: '商品号' },
      buyer_nick: { type: 'string', title: '客户姓名' },
    },
    ui: {
      grid: { md: 12, lg: 8 },
      spanLabelFixed: 120,
    },
  };

  btn: SFButton = {
    render: { grid: { span: 24 }, class: 'text-center mb0', spanLabelFixed: 0 },
    submit: 'Search',
  };

  constructor(
    route: ActivatedRoute,
    private loc: Location,
    private http: _HttpClient,
    private drawer: DrawerHelper,
    private cd: ChangeDetectorRef,
  ) {
    this.statusIndex = route.snapshot.queryParams.index || 2;
  }

  ngOnInit() {
    this.changeTab();
  }

  load(params: any = null) {
    params = params || this.params;
    this.loading = true;
    this.http.get('/trade', params).subscribe((res: any) => {
      this.loading = false;
      this.list = res.list;
      this.total = res.total;
      this.cd.detectChanges();
    });
  }

  changeTab() {
    this.params.statusList = [
      null,
      ['WAIT_BUYER_PAY', 'WAIT_PAY_CONFIRM'], // 未付款
      ['WAIT_SELLER_STOCK_OUT'], // 待发货
      ['WAIT_GOODS_RECEIVE_CONFIRM'], // 已发货
      ['FINISHED'], // 完成
      ['CANCELED'], // 取消
    ][this.statusIndex];

    this.load();

    this.loc.replaceState(`/ec/trade?index=${this.statusIndex}`);
  }

  view(i: any) {
    this.drawer
      .create(`查看订单 #${i.id}`, ECTradeViewComponent, { i }, { size: 666 })
      .subscribe(() => this.load());
  }

  memo(i: any) {
    this.drawer
      .create(`商家备注`, ECTradeMemoComponent, { i }, { size: 350 })
      .subscribe((res: any) => {
        i.memo = res.memo;
        this.cd.detectChanges();
      });
  }
}
