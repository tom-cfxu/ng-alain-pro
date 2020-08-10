import { MockRequest, MockStatusError } from '@delon/mock';
import { deepCopy } from '@delon/util';
import { Random } from 'mockjs';
import { genName, genMp } from './utils';

interface Trade {
  id: number;
  buyer_id: number;
  buyer_nick: string;
  price: number;
  discount_fee: number;
  post_fee: number;
  payment: number;
  pay_time?: Date;
  status: number;
  status_str: string;
  logistics_name?: string;
  logistics_no?: string;
  finished?: Date;
  created: Date;
  wares: TradeWare[];
  memo?: string;
  [key: string]: any;
}

interface TradeWare {
  ware_id: number;
  sku_id: number;
  num: number;
  price: number;
  mp: string;
  title: string;
}

const DATA: Trade[] = [];
const STATUS = {
  CANCELED: '取消',
  WAIT_BUYER_PAY: '等待买家付款',
  WAIT_PAY_CONFIRM: '支付确认中',
  WAIT_SELLER_STOCK_OUT: '等待出库',
  WAIT_GOODS_RECEIVE_CONFIRM: '等待确认收货',
  FINISHED: '交易成功',
};

for (let i = 1; i <= 30; i += 1) {
  const buyer_nick = genName();
  const status: any = Object.keys(STATUS)[Random.natural(0, 5)];
  let pay_time: Date = null;
  let finished: Date = null;
  if (status !== 'WAIT_BUYER_PAY' || status !== 'CANCELED') {
    pay_time = new Date();
  }
  if (status !== 'FINISHED') {
    finished = new Date();
  }
  const price = Random.natural(100, 10000);
  const discount_fee = Random.natural(0, 100);
  const post_fee = Random.natural(6, 20);

  DATA.push({
    id: 10000 * i,
    buyer_id: Random.natural(10000, 100000),
    buyer_nick,
    buyer_tel: Random.natural(10000000000, 19999999999),
    buyer_adr: Random.city(true),
    buyer_message: Random.title(5, 20),
    price,
    discount_fee,
    post_fee,
    payment: price - discount_fee + post_fee,
    pay_time,
    finished,
    status,
    status_str: STATUS[status],
    logistics_name: '',
    logistics_no: '',
    created: new Date(),
    wares: genWare(Random.natural(1, 5)),
  });
}

function genWare(count): TradeWare[] {
  return new Array(count).fill({}).map((v, idx) => ({
    ware_id: Random.natural(10000, 10020),
    sku_id: (idx + 1) * 1000,
    num: Random.natural(1, 10),
    price: Random.natural(10, 500),
    mp: genMp(),
    title: Random.ctitle(5, 10),
  }));
}

function get(params: any) {
  let ret = deepCopy(DATA);
  if (params.sorter) {
    const s = params.sorter.split('_');
    ret = ret.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  if (params.id) {
    // tslint:disable-next-line: triple-equals
    ret = ret.filter(data => data.id == params.id);
  }
  if (params.statusList && params.statusList.length > 0) {
    ret = ret.filter(data => params.statusList.indexOf(data.status) > -1);
  }
  if (params.ware_id) {
    // tslint:disable-next-line: triple-equals
    ret = ret.filter(data => data.wares.find(w => w.ware_id == params.ware_id));
  }
  if (params.buyer_nick) {
    ret = ret.filter(data => data.buyer_nick.indexOf(params.buyer_nick) > -1);
  }
  return ret;
}

function getIdx(id: number): number {
  id = +id;
  const idx = DATA.findIndex(w => w.id === id);
  if (idx === -1) throw new MockStatusError(404);
  return idx;
}

export const TRADES = {
  '/trade': (req: MockRequest) => {
    const pi = +(req.queryString.pi || 1);
    const ps = +(req.queryString.ps || 10);
    const data = get(req.queryString);
    return {
      total: data.length,
      list: data.slice((pi - 1) * ps, pi * ps),
    };
  },
  'POST /trade': (req: MockRequest) => {
    const id = req.body.id || 0;
    if (id > 0) {
      const idx = getIdx(id);
      DATA[idx] = { ...DATA[idx], ...req.body };
      return { msg: 'ok', item: DATA[idx] };
    }

    const item = { ...req.body, id: DATA.sort((a, b) => b.id - a.id)[0].id + 1 };
    DATA.push(item);
    return { msg: 'ok', item };
  },
  '/trade/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    const item = { ...DATA[idx] };
    return item;
  },
  'DELETE /trade/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    DATA.splice(idx, 1);
    return { msg: 'ok' };
  },
  'POST /trade/status': (req: MockRequest) => {
    const idx = getIdx(req.body.id || 0);
    DATA[idx].status = req.body.status;
    DATA[idx].status_str = STATUS[req.body.status];
    return { msg: 'ok', item: DATA[idx] };
  },
  'POST /trade/memo': (req: MockRequest) => {
    const idx = getIdx(req.body.id || 0);
    DATA[idx].memo = req.body.memo;
    return { msg: 'ok', item: DATA[idx] };
  },
};
