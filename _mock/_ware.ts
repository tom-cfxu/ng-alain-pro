import { MockRequest, MockStatusError } from '@delon/mock';
import { deepCopy } from '@delon/util';
import { genMp } from './utils';

interface UserPro {
  cid: number;
  cname: string;
  id: number;
  name: string;
  mp: string;
  stock: number;
  outer_id: string;
  market_price: number;
  price: number;
  sale_num: number;
  status: string;
  modified: Date;
  [key: string]: any;
}

const DATA: UserPro[] = [];

for (let i = 1; i <= 20; i += 1) {
  const name = [
    'HUAWEI Mate 20 Pro',
    '小米MAX3',
    'IPhone X',
    'Gree 8,000 BTU Portable Air Conditioner',
  ][Math.floor(Math.random() * 10) % 4];
  DATA.push({
    cid: i * 1000,
    cname: '',
    id: i + 10000,
    name,
    mp: genMp(),
    stock: Math.floor(Math.random() * 1000) % 1000,
    outer_id: `S50-${Math.floor(Math.random() * 100) % 100}`,
    market_price: Math.floor(Math.random() * 1000) % 1000,
    price: Math.floor(Math.random() * 1000) % 1000,
    sale_num: Math.floor(Math.random() * 200) % 200,
    modified: new Date(),
    status: ['CUSTORMER_DOWN', 'ON_SALE', 'AUDIT_AWAIT', 'DELETED'][
      Math.floor(Math.random() * 10) % 4
    ],
    brand: 1,
    place: 1,
  });
}

function get(params: any) {
  let ret = deepCopy(DATA);
  if (params.q) {
    ret = ret.filter(data => data.name.indexOf(params.q) > -1);
  }
  if (params.email) {
    ret = ret.filter(data => data.email.indexOf(params.email) > -1);
  }
  return ret;
}

function getIdx(id: number): number {
  id = +id;
  const idx = DATA.findIndex(w => w.id === id);
  if (idx === -1) throw new MockStatusError(404);
  return idx;
}

export const WARES = {
  '/ware': (req: MockRequest) => {
    const pi = +(req.queryString.pi || 1);
    const ps = +(req.queryString.ps || 10);
    const data = get(req.queryString);
    return {
      total: data.length,
      list: data.slice((pi - 1) * ps, pi * ps),
    };
  },
  'POST /ware': (req: MockRequest) => {
    const id = req.body.id || 0;
    if (id > 0) {
      const idx = getIdx(id);
      DATA[idx] = {...DATA[idx], ...req.body};
      return { msg: 'ok', item: DATA[idx] };
    }

    const item = {...req.body, 
      id: DATA.sort((a, b) => b.id - a.id)[0].id + 1};
    DATA.push(item);
    return { msg: 'ok', item };
  },
  '/ware/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    const item = {
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
      ...DATA[idx],
    };
    return item;
  },
  'DELETE /ware/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    DATA.splice(idx, 1);
    return { msg: 'ok' };
  },
  'POST /ware/status': (req: MockRequest) => {
    const idx = getIdx(req.body.id || 0);
    const item = DATA[idx];
    item.status = req.body.status;
    return { msg: 'ok', item };
  },
  '/ware/cat': [
    { id: 1, name: '颜色', value: '红色', color: '#f5222d', type: 'color' },
    { id: 2, name: '颜色', value: '绿色', color: '#a0d911', type: 'color' },
    { id: 3, name: '颜色', value: '蓝色', color: '#1890ff', type: 'color' },
    { id: 4, name: '颜色', value: '洋红', color: '#eb2f96', type: 'color' },
    { id: 10, name: '尺寸', value: 'S', type: 'size' },
    { id: 11, name: '尺寸', value: 'M', type: 'size' },
    { id: 12, name: '尺寸', value: 'L', type: 'size' },
    { id: 13, name: '尺寸', value: 'XL', type: 'size' },
    { id: 14, name: '尺寸', value: 'XXL', type: 'size' },
    { id: 15, name: '尺寸', value: 'XXXL', type: 'size' },
  ],
};
