import { Injectable, OnDestroy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { deepCopy } from '@delon/util';

export interface SkuProperty {
  name: string;
  type: string;
  sel: boolean;
  arr: any[];
}

@Injectable()
export class WareEditService implements OnDestroy {
  private notify$ = new BehaviorSubject<string>('');
  private tmpDef: any = {};
  private _i: any;

  colors: any[] = [];
  cog: {
    list: SkuProperty[];
    count: number;
  } = {
    list: [],
    count: 0,
  };

  get change() {
    return this.notify$.asObservable();
  }

  get i() {
    return this._i;
  }

  constructor(private http: _HttpClient, private msg: NzMessageService) {}

  private fixItem(i: any) {
    // TODO: just only fix item, don't used in production env.
    this._i = {
      id: 0,
      brand: 1,
      is_7return: true,
      prop: {
        1: '是',
        2: '24天',
        3: '0.5克',
      },
      place: 1,
      weight: 10,
      skus: [
        {
          id: 10001,
          attributes: '1:10',
          names: [`红色`, `S`],
          price: 1000,
          stock: 10,
        },
        {
          id: 10002,
          attributes: '1:11',
          names: [`红色`, `M`],
          price: 1000,
          stock: 11,
        },
        {
          id: 10003,
          attributes: '3:10',
          names: [`蓝色1`, `S`],
          price: 1000,
          stock: 12,
        },
        {
          id: 10004,
          attributes: '3:11',
          names: [`蓝色1`, `M`],
          price: 1000,
          stock: 13,
        },
      ],
      imgs: {
        0: ['https://randomuser.me/api/portraits/lego/0.jpg'],
        1: ['https://randomuser.me/api/portraits/lego/1.jpg'],
        3: ['https://randomuser.me/api/portraits/lego/3.jpg'],
      },
      desc: `<p>Test</p>`,
      ...i,
    };

    this.notify('cat');
  }

  load(id: number) {
    if (id > 0) {
      this.http.get(`/ware/${id}`).subscribe(res => this.fixItem(res));
    } else {
      this.fixItem({});
    }
  }

  notify(type: string) {
    this.notify$.next(type);
  }

  // #region skus

  skuLoad(cat: any) {
    return new Promise(resolve => {
      const ls = deepCopy(cat);
      ls.forEach(i => {
        i.value_org = i.value + '';

        let item = this.cog.list.find(w => w.name === i.name);
        if (!item) {
          item = {
            name: i.name,
            type: i.type,
            sel: false,
            arr: [],
          };
          this.cog.list.push(item);
        }

        item.arr.push(i);
      });

      // set default
      for (const i of this.i.skus) {
        const arrtIdArr = i.attributes.split(':').map(v => +v);
        this.tmpDef[i.attributes] = i;
        for (let pos = 0; pos < this.cog.list.length; pos++) {
          this.cog.list[pos].arr
            .filter(item => item.id === arrtIdArr[pos])
            .forEach(item => {
              item.value = i.names[pos];
              item.sel = true;
            });
        }
      }

      resolve();
    });
  }

  skuCho() {
    // 1. clean skus
    this.i.skus.length = 0;
    const colorData = this.cog.list.find(w => w.type === 'color');
    this.colors = (colorData && colorData.arr.filter(w => w.sel)) || [];
    // 2. map all selected property
    const selData = this.cog.list.map(v => {
      v.sel = v.arr.filter(w => w.sel).length > 0;
      return v.arr;
    });
    const validCount = selData.filter(w => w.filter(a => a.sel).length > 0).length;

    const ids: string[] = [];
    const tmpIds: number[] = [];
    const inFn = (depth: number) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < selData[depth].length; i++) {
        const item = selData[depth][i];
        tmpIds[depth] = item.sel ? item.id : 0;
        if (depth === selData.length - 1) {
          // 有效数据及去重
          if (tmpIds.filter(w => w !== 0).length === validCount && !ids.includes(tmpIds.join(':'))) {
            ids.push(tmpIds.join(':'));
          }
          continue;
        }
        inFn(depth + 1);
      }
    };
    if (selData.length > 0) {
      inFn(0);
    }
    this.cog.count = validCount;

    // 3. resotre skus default valuese
    ids.forEach(attributes => {
      const item = {
        ...this.tmpDef[attributes],
        attributes,
        names: attributes
          .split(':')
          .map(v => +v)
          .map((id, idx) => (id > 0 ? this.cog.list[idx].arr.find(w => w.id === id).value : '')),
      };
      this.i.skus.push(item);
    });

    if (this.i.skus.length === 0) {
      this.i.skus.push({ ...this.tmpDef[''] });
    }
  }

  // #endregion

  getSaveData(): {} {
    const postData = deepCopy(this.i);
    // mp
    const wareMainImgs = postData.imgs[0].ls.filter(w => !!w);
    if (wareMainImgs.length === 0) {
      this.msg.error('图像至少选择一张以上');
      return false;
    }
    postData.mp = wareMainImgs[0];
    // imgs
    const imgs = {};
    (postData.imgs as any[]).forEach(i => {
      imgs[i.id] = i.ls;
    });
    postData.imgs = imgs;
    return postData;
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
