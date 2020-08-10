import { MockRequest, MockStatusError } from '@delon/mock';
import { deepCopy } from '@delon/util';
import { genMp, genLabel } from './utils';
import { Random } from 'mockjs';

let id = 1;
const CATEGORY = [
  {
    id: 1,
    title: 'General',
    list: [
      {
        id: 1,
        title: 'Getting started',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
      {
        id: 2,
        title: 'Announcements',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
      {
        id: 3,
        title: 'Guides',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Shopping',
    list: [
      {
        id: 4,
        title: 'Guides',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
      {
        id: 5,
        title: 'Payments',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
      {
        id: 6,
        title: 'Products',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
      {
        id: 7,
        title: 'Refund',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Support',
    list: [
      {
        id: 8,
        title: 'Common questions',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
      },
      {
        id: 9,
        title: 'Site issues',
        threads: Random.natural(1, 20),
        replies: Random.natural(6, 100),
        last: {
          id: id++,
          mp: genMp(),
          title: Random.title(5, 10),
          user_name: Random.name(),
          time: '1d ago',
        },
      },
    ],
  },
];

const THREAD: any[] = new Array(20).fill({}).map((v, idx) => ({
  id: id++,
  title: Random.title(5, 10),
  replies: Random.natural(1, 1000),
  label: idx % 2 === 0 && Random.boolean() ? genLabel() : null,
  category_id: Random.natural(1, 9),
  last: {
    id: id++,
    mp: genMp(),
    title: Random.title(5, 10),
    user_name: Random.name(),
    time: '1d ago',
  },
}));

const REPLIES: any[] = new Array(20).fill({}).map((v, idx) => ({
  id: id++,
  content: Random.paragraph(),
  user: {
    name: Random.name(),
    mp: genMp(),
    posts: Random.natural(0, 1000),
  },
  time: Random.time(),
  like: Random.natural(0, 100),
  dislike: Random.natural(0, 10),
}));

function get(params: any) {
  let ret = deepCopy(THREAD);
  if (params.q) {
    ret = ret.filter(data => data.name.indexOf(params.q) > -1);
  }
  return ret;
}

function getIdx(itemId: number): number {
  itemId = +itemId;
  const idx = THREAD.findIndex(w => w.id === itemId);
  if (idx === -1) throw new MockStatusError(404);
  return idx;
}

function getCate(itemId: number) {
  let item: any;
  const category = deepCopy(CATEGORY).find(w => {
    item = w.list.find(l => l.id === itemId);
    if (item) return true;
    return false;
  });
  delete category.list;
  return item;
}

export const FORUMS = {
  '/forum/category': CATEGORY,
  '/forum/thread/:id': (req: MockRequest) => {
    // list
    const pi = +(req.queryString.pi || 1);
    const ps = +(req.queryString.ps || 10);
    const data = get(req.queryString);
    return {
      category: getCate(+req.params.id),
      total: data.length,
      list: data.slice((pi - 1) * ps, pi * ps),
    };
  },
  '/forum/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    const item = {
      ...THREAD[idx],
      time: '3 days ago',
      like: Random.natural(0, 100),
      view: Random.natural(0, 10000),
      user: {
        name: Random.name(),
        mp: genMp(),
        posts: Random.natural(0, 1000),
      },
      desc:
        '<p>' +
        new Array(Random.natural(1, 3))
          .fill('')
          .map(v => Random.paragraph())
          .join('</p><p>') +
        '</p>',
    };
    item.category = getCate(item.category_id);
    return item;
  },
  '/forum/:id/replies': (req: MockRequest) => {
    const pi = +(req.queryString.pi || 1);
    const ps = +(req.queryString.ps || 10);
    return {
      total: REPLIES.length,
      list: REPLIES.slice((pi - 1) * ps, pi * ps),
    };
  },

  'POST /forum': (req: MockRequest) => {
    const itemId = req.body.id || 0;
    if (itemId > 0) {
      const idx = getIdx(itemId);
      THREAD[idx] = { ...THREAD[idx], ...req.body };
      return { msg: 'ok', item: THREAD[idx] };
    }

    const item = { ...req.body, id: THREAD.sort((a, b) => b.id - a.id)[0].id + 1 };
    THREAD.push(item);
    return { msg: 'ok', item };
  },
  'DELETE /forum/:id': (req: MockRequest) => {
    const idx = getIdx(req.params.id || 0);
    THREAD.splice(idx, 1);
    return { msg: 'ok' };
  },
};
