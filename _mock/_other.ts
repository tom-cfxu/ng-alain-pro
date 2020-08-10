// tslint:disable:no-shadowed-variable max-line-length
import { Random } from 'mockjs';
import { MockStatusError, MockRequest } from '@delon/mock';
import {
  genLabel,
  genMp,
  genArr,
  genName,
  genBigMp,
  genData,
  genTag,
  genColorName,
} from './utils';
import { deepCopy } from '@delon/util';
import * as addDays from 'date-fns/add_days';
import * as startOfMonth from 'date-fns/start_of_month';
import * as getDaysInMonth from 'date-fns/get_days_in_month';
import * as format from 'date-fns/format';

let ID = 1;
const DATA: any = {
  kanban: null,
  task: null,
  email: null,
  project: null,
  client: null,
  contact: null,
  pricing: null,
  billing: null,
  course: null,
  chat: null,
  gallery: null,
  article: null,
  voting: null,
  invoice: null,
  faq: null,
  calendar: null,
  quick: null,
  dd: null,
};

function getIdx(type: string, id: number): number {
  id = +id;
  const idx = DATA[type].findIndex(w => w.id === id);
  if (idx === -1) throw new MockStatusError(404);
  return idx;
}

function save(type: string, body: any) {
  const id = body.id || 0;
  if (id > 0) {
    const idx = getIdx(type, id);
    DATA[type][idx] = {...DATA[type][idx], ...body};
    return { msg: 'ok', item: DATA[type][idx], type: 'edit' };
  }

  const item = {...body, 
    id: DATA[type].sort((a, b) => b.id - a.id)[0].id + 1};
  (DATA[type] as any[]).splice(0, 0, item);
  return { msg: 'ok', item, type: 'add' };
}

function del(type: string, p: any) {
  const cid = +(p.cid || '0');
  let list: any[] = DATA[type];
  if (cid > 0) {
    list = DATA[type].find(w => w.id === cid).list;
  }

  const idx = list.findIndex(w => w.id === p.id);
  list.splice(idx, 1);
  return { msg: 'ok' };
}

function genHtml() {
  return (
    '<p>' +
    new Array(Random.natural(1, 3))
      .fill('')
      .map(v => Random.sentence())
      .join('</p><p>') +
    '</p>'
  );
}

function attachements() {
  return new Array(Random.natural(2, 6)).fill({}).map((v, idx) => {
    const item = {
      url: Random.url(),
      type: genArr(['jpg', 'zip', 'pdf']),
      filename: Random.name(false),
      size: genArr(['100KB', '980KB', '1.56MB']),
    };
    if (item.type === 'jpg') {
      item.url = genBigMp();
    }
    return item;
  });
}

function genPage(type: string, queryString: any, qField = 'name') {
  const pi = +(queryString.pi || 1);
  const ps = +(queryString.ps || 10);
  // data
  let data = deepCopy(DATA[type]);
  if (queryString.q) {
    data = data.filter(data => data[qField].indexOf(queryString.q) > -1);
  }
  return {
    total: data.length,
    list: data.slice((pi - 1) * ps, pi * ps),
  };
}

// #region kanban

function kanbanList() {
  if (DATA.kanban) return DATA.kanban;
  const res: any[] = [
    {
      id: 1,
      title: 'To Do',
      list: [],
      color: '#fadb14',
      icon: 'warning',
    },
    { id: 2, title: 'In progress', color: '#1890ff', icon: 'tool', list: [] },
    { id: 3, title: 'Done', color: '#52c41a', icon: 'check-circle', list: [] },
    { id: 4, title: 'Gone', color: '#f5222d', icon: 'delete', list: [] },
  ];
  for (const i of res) {
    i.list = new Array(Random.natural(2, 6)).fill({}).map((v, idx) => ({
      id: idx + 1,
      title: Random.ctitle(3, 4),
      content: Random.ctitle(0, 50),
      attachement: Random.boolean() && Random.boolean() && Random.boolean(),
    }));
  }
  // new
  if (res[0].list.length > 0) {
    res[0].list[Random.natural(0, res[0].list.length - 1)].label = {
      color: 'green',
      text: 'Clients',
    };
  }
  if (res[1].list.length > 0) {
    res[1].list[Random.natural(0, res[1].list.length - 1)].label = {
      color: 'red',
      text: 'Important',
    };
  }
  if (res[2].list.length > 0) {
    res[2].list[Random.natural(0, res[2].list.length - 1)].label = {
      color: 'blue',
      text: 'Other',
    };
  }
  // labels
  DATA.kanban = res;
  return res;
}

// #endregion

// #region task

function taskList() {
  if (DATA.task) return DATA.task;
  const res: any[] = [
    { id: 1, title: 'Today', list: [] },
    { id: 2, title: 'Tomorrow', list: [] },
    { id: 3, title: 'Next week', list: [] },
  ];
  for (const i of res) {
    i.list = new Array(Random.natural(2, 8)).fill({}).map((v, idx) => ({
      id: idx + 1,
      title: Random.ctitle(3, 16),
      due:
        i.id === 1 && Random.boolean()
          ? `${Random.natural(1, 59)} ${
              Random.boolean() ? 'mins' : 'hours'
            } left`
          : null,
    }));
  }
  // new
  if (res[0].list.length > 0) {
    res[0].list[Random.natural(0, res[0].list.length - 1)].label = {
      color: 'green',
      text: 'Clients',
    };
  }
  if (res[1].list.length > 0) {
    res[1].list[Random.natural(0, res[1].list.length - 1)].label = {
      color: 'red',
      text: 'Important',
    };
    res[0].list[Random.natural(0, res[0].list.length - 1)].done = true;
  }
  if (res[2].list.length > 0) {
    res[2].list[Random.natural(0, res[2].list.length - 1)].label = {
      color: 'blue',
      text: 'Other',
    };
    res[0].list[Random.natural(0, res[0].list.length - 1)].done = true;
  }
  // labels
  DATA.task = res;
  return res;
}

// #endregion

// #region email

function emailList(queryString: any) {
  if (DATA.email) return genPage('email', queryString, 'subject');
  const res: any[] = new Array(20).fill({}).map((v, idx) => ({
    id: ID++,
    from: Random.email(),
    from_name: genName(),
    to: Random.email(),
    to_name: Random.name(),
    cc: [Random.email(), Random.email()],
    subject: Random.title(1, 6),
    body: Random.paragraph(),
    read: idx % 2 === 0 && Random.boolean(),
    star: Random.boolean(),
    label: genLabel(),
    attach: idx % 3 === 0 && Random.boolean(),
    time: `1${Random.boolean() ? 'h' : 'd'} ago`,
  }));
  // labels
  DATA.email = res;
  return genPage('email', queryString, 'subject');
}

function emailGet(id: number) {
  const idx = getIdx('email', id || 0);
  const item = {...DATA.email[idx], 
    mp: genMp(),
    desc: genHtml(),
    attachements: attachements()};
  return item;
}
// #endregion

// #region project

function projectList() {
  if (DATA.project) return DATA.project;
  const res: any[] = new Array(5).fill({}).map((v, idx) => ({
    id: idx + 1,
    title: genArr([
      'UI update',
      'Web Design',
      'Pro Design',
      'Ng Alain',
      'Delon',
      'SEO',
    ]),
    status: idx % 2 ? genArr(['active', 'pending', 'complete']) : 'active',
    task: {
      process: Random.natural(1, 100),
      opened: Random.natural(1, 100),
      completed: Random.natural(1, 100),
    },
    remark: Random.title(5, 10),
    created: Random.date(),
    deadline: Random.date(),
    tean: new Array(Random.natural(1, 6)).fill({}).map(() => ({
      name: genName(),
      mp: genMp(),
    })),
    leaders: new Array(Random.natural(1, 2)).fill({}).map(() => ({
      name: genName(),
      mp: genMp(),
    })),
    participants: new Array(Random.natural(1, 6)).fill({}).map(() => ({
      name: Random.name(),
      mp: genMp(),
    })),
  }));
  // labels
  DATA.project = res;
  return res;
}

function projectGet(id: number) {
  const idx = getIdx('project', id || 0);
  const item = {...DATA.project[idx], 
    user_name: genName(),
    desc: genHtml(),
    attachements: attachements(),
    tasks: DATA.task,
    discussions: new Array(Random.natural(3, 8)).fill({}).map((v, idx) => ({
      id: idx + 1,
      user_avatar: genMp(),
      user_name: genName(),
      time: Random.datetime(),
      content: Random.paragraph(1, 1),
    })),
    activities: new Array(Random.natural(3, 12)).fill({}).map((v, idx) => ({
      id: idx + 1,
      user_avatar: genMp(),
      user_name: genName(),
      time: Random.datetime(),
      type: idx % 2 === 0 ? genArr(['add', 'completed', 'assigned']) : 'push',
      commit: Random.natural(10000, 99999),
      assigne_name: Random.name(),
      message: Random.title(),
    }))};
  return item;
}

// #endregion

// #region billing

function billingList(queryString: any) {
  if (DATA.billing) return genPage('billing', queryString, 'client');
  const res: any[] = new Array(11).fill({}).map((v, idx) => ({
    id: idx + 1,
    order: `FR0${Random.natural(10, 99)}`,
    client: genArr(['Google', 'Alibaba', 'Tencent']),
    fee: Random.float(0, 9.0),
    amount: Random.float(0.1, 99999.0),
    date: Random.now('day'),
    status:
      idx % 2 ? genArr(['Completed', 'Pending', 'Rejected']) : 'Completed',
    auth_code: Random.natural(100000000),
    address: (Random as any).county(true),
    first_name: Random.first(),
    last_name: Random.last(),
    country: 'China',
  }));
  // labels
  DATA.billing = res;
  return genPage('billing', queryString, 'client');
}

function billingGet(id: number) {
  const idx = getIdx('billing', id || 0);
  const item = {...DATA.billing[idx], 
    messages: new Array(Random.natural(0, 5)).fill({}).map((v, idx) => ({
      id: idx + 1,
      time: `${Random.natural(1, 6)} day ago`,
      message: Random.paragraph(1, 1),
    }))};
  return item;
}

// #endregion

// #region contact

function contactList(queryString: any) {
  if (DATA.contact) return genPage('contact', queryString, 'contact');
  const res: any[] = new Array(11).fill({}).map((v, idx) => ({
    id: idx + 1,
    mp: genMp(),
    name: genName(),
    user_name: Random.name(false),
    company: Random.title(1, 3),
    email: Random.email(),
    tel: Random.natural(10000000000, 16000000000),
  }));
  // labels
  DATA.contact = res;
  return genPage('contact', queryString, 'company');
}

// #endregion

// #region pricing

function pricingList() {
  if (DATA.pricing) return DATA.pricing;
  const res: any = {
    prices: [
      {
        id: 1,
        title: 'Basic',
        icon: 'shop',
        mo: 12,
        yr: 12 * 12,
        user: 5,
        project: 5,
        space: '100GB',
      },
      {
        id: 2,
        title: 'Company',
        icon: 'bank',
        mo: 25,
        yr: 25 * 12,
        user: 30,
        project: 150,
        space: '300GB',
      },
      {
        id: 3,
        title: 'Enterprise',
        icon: 'crown',
        mo: 50,
        yr: 50 * 12,
        user: -1,
        project: -1,
        space: '1000GB',
      },
    ],
    faq: [
      {
        q: 'Can I cancel at anytime?',
        a:
          // tslint:disable-next-line:max-line-length
          'Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.',
      },
      {
        q: 'My team has credits. How do we use them?',
        a:
          'Once your team signs up for a subscription plan. enim eiusmod high life accusamus eoset dignissimos.',
      },
      {
        q: `How does Front's pricing work?`,
        a:
          'Our subscriptions are tiered. based on the number of people enim eiusmod high life accusamus terry richardson ad squid.',
      },
      {
        q: 'How secure is Front?',
        a:
          'Protecting the data you trust to Front is our first priority. at vero eoset dignissimos ducimus qui blanditiis.',
      },
      {
        q: 'Do you offer discounts?',
        a: `We've built in discounts at each tier for teams. leggings occaecat craft beer farm-to-table. raw denim aesthetic synth nesciunt.`,
      },
      {
        q: 'What is your refund policy?',
        a:
          'We do not offer refunds apart leggings occaecat craft beer farm-to-table. raw leggings occaecat craft.',
      },
    ],
  };
  // labels
  DATA.pricing = res;
  return res;
}

// #endregion

// #region client

function clientList(queryString: any) {
  if (DATA.client) return genPage('client', queryString, 'company');
  const res: any[] = new Array(11).fill({}).map((v, idx) => ({
    id: idx + 1,
    mp: genMp(),
    name: genName(),
    user_name: Random.name(false),
    company: Random.title(1, 3),
    email: Random.email(),
    tel: Random.natural(10000000000, 16000000000),
    status: idx % 2 ? genArr(['active', 'pending', 'progress']) : 'active',
  }));
  // labels
  DATA.client = res;
  return genPage('client', queryString, 'company');
}

function clientGet(id: number) {
  const idx = getIdx('client', id || 0);
  const item = {...DATA.client[idx], 
    messages: new Array(Random.natural(0, 5)).fill({}).map((v, idx) => ({
      id: idx + 1,
      time: `${Random.natural(1, 6)} day ago`,
      message: Random.paragraph(1, 1),
    }))};
  return item;
}

// #endregion

// #region course

function courseList(queryString: any) {
  if (DATA.course) return genPage('course', queryString, 'title');
  const res: any[] = new Array(10).fill({}).map((v, idx) => ({
    id: idx + 1,
    mp: genBigMp(),
    tags: genTag(),
    price: idx === 0 ? 0 : Random.natural(0, 100),
    title: Random.title(2, 5),
    remark: Random.paragraph(1, 1),
    star: genArr([4, 4.5, 5]),
    hour: Random.natural(10, 99),
  }));
  // labels
  DATA.course = res;
  return genPage('course', queryString, 'title');
}

// #endregion

// #region chat

function chatList() {
  if (DATA.chat) return DATA.chat;
  const res: any = {
    users: new Array(10).fill({}).map((v, idx) => ({
      id: idx + 1,
      mp: genMp(),
      name: genName(),
      count: idx % 3 === 0 ? Random.natural(0, 5) : 0,
      online: idx < 5 ? true : false,
      unread: Random.boolean() && Random.boolean() ? Random.natural(0, 5) : 0,
    })),
  };
  // labels
  DATA.chat = res;
  return res;
}

// #endregion

// #region gallery

function galleryList() {
  if (DATA.gallery) return DATA.gallery;
  const res: any = new Array(16).fill({}).map((v, idx) => ({
    id: idx + 1,
    url: genBigMp(),
    title: Random.title(),
    type: genArr(['Nature', 'Beach', 'Animal', 'Other']),
  }));
  // labels
  DATA.gallery = res;
  return res;
}

// #endregion

// #region article

function articleList(queryString: any) {
  if (DATA.article) return genPage('article', queryString, 'title');
  const res: any[] = new Array(11).fill({}).map((v, idx) => ({
    id: idx + 1,
    mp: genMp(),
    name: genName(),
    title: Random.ctitle(),
    likes: Random.natural(0, 1000),
    comments: Random.natural(0, 1000),
    created: Random.now('day'),
    status: idx % 2 ? genArr(['Published', 'Draft', 'Deleted']) : 'Published',
  }));
  // labels
  DATA.article = res;
  return genPage('article', queryString, 'title');
}

function articleGet(id: number) {
  const idx = getIdx('article', id || 0);
  const item = {...DATA.article[idx], };
  return item;
}

// #endregion

// #region voting

function votingList(queryString: any) {
  if (DATA.voting) return genPage('voting', queryString, 'title');
  const res: any[] = new Array(11).fill({}).map((v, idx) => ({
    id: idx + 1,
    voting: Random.integer(-10, 10000),
    title: Random.title(5, 10),
    content: Random.paragraph(),
    likes: Random.natural(0, 1000),
    created: Random.now('day'),
  }));
  // labels
  DATA.voting = res;
  return genPage('voting', queryString, 'title');
}

function votingSave(req: any) {
  const idx = getIdx('voting', req.id || 0);
  DATA.voting[idx].value += req.voting;
  return { msg: 'ok', item: DATA.voting[idx] };
}

// #endregion

// #region voting

function invoice() {
  if (DATA.invoice) return deepCopy(DATA.invoice);
  const res: any = {
    id: Random.integer(10000, 99999),
    zone: 'Mountain View, CA 94043 United States',
    address: '1600 Amphitheatre Parkway',
    tel: '15900000000, +86 (021) 99999999',
    date: genData(0),
    to: {
      company: 'XXX Company LTD',
      zone: 'Mountain View, CA 94043 United States',
      address: '1600 Amphitheatre Parkway',
      tel: '15900000000, +86 (021) 99999999',
      email: 'cipchk@qq.com',
    },
    payment: {
      total: 0,
      bank: 'XXXX Bank',
      country: 'China',
      city: 'Shang Hai',
      address: 'xxx xxxx',
      code: '012384',
    },
    wares: [
      {
        id: 1,
        title: Random.title(),
        remark: Random.title(),
        price: +Random.float(0.1, 999).toFixed(2),
        num: +Random.natural(1, 10),
      },
      {
        id: 2,
        title: Random.title(),
        remark: Random.title(),
        price: +Random.float(0.1, 999).toFixed(2),
        num: +Random.natural(1, 10),
      },
    ],
    note: Random.paragraph(),
  };
  // total
  res.wares.forEach(i => {
    i.total = +(i.price * i.num).toFixed(2);
  });
  res.tax_rate = 0.2;
  res.total = +(res.wares as any[])
    .reduce((a, b) => (a += b.total), 0)
    .toFixed(2);
  res.tax = +(res.total * 0.2).toFixed(2);
  res.payment_total = +(res.total + res.tax).toFixed(2);
  DATA.invoice = res;

  return deepCopy(DATA.invoice);
}

// #endregion

// #region faq

function faq() {
  if (DATA.faq) return deepCopy(DATA.faq);
  DATA.faq = new Array(6).fill({}).map((v, idx) => ({
    title: `Knowledge ${idx + 1}`,
    icon: 'question-circle',
    primary: idx < 3,
    remark: 'The list of FAQ',
    children: new Array(Random.natural(3, 6)).fill({}).map((v, idx) => ({
      active: idx === 0,
      q: 'What is a product key?',
      a: genHtml(),
    })),
  }));

  return deepCopy(DATA.faq);
}

// #endregion

// #region calendar

function calendar(req: any) {
  const cur = new Date(+req.time || new Date());
  const startDate = startOfMonth(cur);
  const max = getDaysInMonth(cur);
  const start = format(startDate, 'YYYY-MM');
  const now = format(new Date(), 'YYYY-MM-DD');
  return [
    {
      id: 1,
      title: 'All Day Event',
      start: `${start}-1`,
      className: 'fc-event-danger fc-event-fill-warning',
    },
    {
      id: 2,
      title: 'Reporting',
      start: `${start}-7T13:30:00`,
      end: `${start}-7`,
      className: 'fc-event-success',
    },
    {
      id: 3,
      title: 'Company Trip',
      start: `${start}-12`,
      end: `${start}-14`,
      className: 'fc-event-primary',
    },
    {
      id: 4,
      title: 'Product Release',
      start: `${start}-3`,
      end: `${start}-5`,
      className: 'fc-event-light fc-event-fill-primary',
    },
    {
      id: 5,
      title: 'Repeating Event',
      start: `${start}-09T16:00:00`,
      className: 'fc-event-purple',
    },
    { id: 6, title: 'Repeating Event', start: `${start}-11T16:00:00` },
    {
      id: 7,
      title: 'Meeting',
      start: `${now}T10:00:00`,
      end: `${now}T11:30:00`,
    },
    { id: 8, title: 'Lunch', start: `${now}T12:00:00` },
    {
      id: 9,
      title: 'Meeting',
      start: `${now}T14:00:00`,
      className: 'fc-event-warning',
    },
    {
      id: 10,
      title: 'Happy Hour',
      start: `${now}T17:30:00`,
      className: 'fc-event-success',
    },
    {
      id: 11,
      title: 'Dinner',
      start: `${now}T18:30:00`,
      className: 'fc-event-fill-danger fc-event-light',
    },
    {
      id: 12,
      title: 'Birthday Party',
      start: `${now}T21:00:00`,
      className: 'fc-event-primary',
    },
    {
      id: 13,
      title: 'Click for Ng Alain',
      url: 'https://ng-alain.com',
      start: `${start}-27`,
      className: 'fc-event-fill-success fc-event-light',
    },
    {
      id: 14,
      title: 'Repeating Event',
      start: `${start}-09T08:00:00`,
      className: 'fc-event-magenta',
    },
  ];
}

// #endregion

// #region quick

function quick() {
  if (DATA.quick) return deepCopy(DATA.quick);
  DATA.quick = {
    notifications: new Array(6).fill({}).map(() => ({
      dot: genArr([
        { icon: 'warning', bg: 'error' },
        { icon: 'pie-chart', bg: 'primary' },
        { icon: 'message', bg: 'success' },
        { icon: 'bell', bg: 'cyan' },
      ]),
      content: Random.title(5, 15),
      time: genArr(['01:01 PM', '09:00 AM', '18:56']),
      tags: genTag().join(','),
    })),
    actions: new Array(6).fill({}).map(() => ({
      bg: genColorName(),
      title: Random.title(2, 3),
      content: Random.title(5, 15),
    })),
    settings: {
      notification: true,
      audit_log: false,
      new_order: false,
      tracking_order: false,
      reports_order: true,
      new_customer: true,
      reporting_customer: true,
    },
  };

  return deepCopy(DATA.quick);
}

// #endregion

// #region dd

function ddList() {
  if (DATA.dd) return DATA.dd;
  DATA.dd = [
    {
      name: 'total-sales',
      title: '总数-总销售额',
      enabled: true,
      params: { title: '总销售额', total: 100, week: 10, day: 11, daySales: 1000 }
    },
    {
      name: 'total-sales',
      title: '总数-总订单量',
      enabled: false,
      params: { title: '总订单量', total: 5500, week: 320, day: 5, daySales: 5422 }
    },
    {
      name: 'total-sales',
      title: '总数-总用户量',
      enabled: false,
      params: { title: '总用户量', total: 500, week: 80, day: 23, daySales: 6666 }
    },
    {
      name: 'total-sales',
      title: '总数-其他',
      enabled: false,
      params: { title: '其他', total: 200, week: 80, day: 23, daySales: 77777 }
    },
    {
      name: 'visits',
      title: '访问量',
      enabled: true,
      params: { url: '/chart' }
    },
    {
      name: 'effect',
      title: '访问量',
      enabled: true,
      params: { percent: 66, week: 11, day: 23 }
    },
    {
      name: 'gauge',
      title: '核销率',
      enabled: true
    },
    {
      name: 'radar',
      title: '指数',
      enabled: true,
      params: { title: '贡献指数', url: '/chart' }
    },
    {
      name: 'activities',
      title: '动态',
      enabled: true,
      params: { title: '动态', url: '/api/activities' }
    },
  ];
  return DATA.dd;
}

function ddSave(req: any) {
  DATA.dd = req;
  return { msg: 'ok' };
}

// #endregion

export const OTHERS = {
  '/kanban-board': kanbanList(),
  'DELETE /kanban-board': (req: MockRequest) => del('kanban', req.queryString),
  '/task': taskList(),
  'DELETE /task': (req: MockRequest) => del('task', req.queryString),
  '/email': (req: MockRequest) => emailList(req.queryString),
  '/email/:id': (req: MockRequest) => emailGet(+req.params.id),
  'DELETE /email': (req: MockRequest) => del('email', req.queryString),
  '/project': projectList(),
  '/project/:id': (req: MockRequest) => projectGet(+req.params.id),
  'DELETE /project': (req: MockRequest) => del('project', req.queryString),
  '/client': (req: MockRequest) => clientList(req.queryString),
  '/client/:id': (req: MockRequest) => clientGet(+req.params.id),
  '/contact': (req: MockRequest) => contactList(req.queryString),
  'DELETE /contact': (req: MockRequest) => del('contact', req.queryString),
  '/pricing': () => pricingList(),
  '/billing': (req: MockRequest) => billingList(req.queryString),
  '/course': (req: MockRequest) => courseList(req.queryString),
  '/chat': () => chatList(),
  '/chat/message': () => {
    const item: any = {
      type: Random.boolean() && Random.boolean() ? 'image' : 'text',
      dir: Random.boolean() ? 'left' : 'right',
    };
    item.msg = item.type === 'text' ? Random.paragraph(1, 1) : genBigMp();
    return item;
  },
  '/gallery': () => galleryList(),
  '/article': (req: MockRequest) => articleList(req.queryString),
  '/article/:id': (req: MockRequest) => articleGet(+req.params.id),
  'DELETE /article': (req: MockRequest) => del('article', req.queryString),
  'POST /article': (req: MockRequest) => save('article', req.body),
  '/voting': (req: MockRequest) => votingList(req.queryString),
  'POST /voting': (req: MockRequest) => votingSave(req.body),
  '/invoice': () => invoice(),
  '/faq': () => faq(),
  '/calendar': (req: MockRequest) => calendar(req.queryString),
  '/quick': () => quick(),
  '/dd': () => ddList(),
  'POST /dd': (req: MockRequest) => ddSave(req.body),
};
