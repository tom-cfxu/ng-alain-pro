import { STColumnTag } from '@delon/abc';

export const UserStatus: STColumnTag = {
  deleted: { text: 'Deleted', color: 'red' },
  banned: { text: 'Banned', color: 'orange' },
  active: { text: 'Active', color: 'green' },
};
