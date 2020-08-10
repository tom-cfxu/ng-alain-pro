import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UserStatus } from '../../dist';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'app-sys-user-view',
  templateUrl: './view.component.html',
})
export class SysUserViewComponent {
  id = 0;
  i: any;
  permissions = [
    { name: 'Users', read: true, write: false, create: false, delete: false },
    { name: 'Articles', read: true, write: true, create: true, delete: false },
    { name: 'Staff', read: false, write: false, create: false, delete: false },
  ];
  permissionColumns: STColumn[] = [
    { title: 'Module', index: 'name' },
    { title: 'Read', index: 'read', type: 'yn' },
    { title: 'Write', index: 'write', type: 'yn' },
    { title: 'Create', index: 'create', type: 'yn' },
    { title: 'Delete', index: 'delete', type: 'yn' },
  ];
  constructor(route: ActivatedRoute, private http: _HttpClient) {
    route.params.subscribe(res => {
      this.id = res.id || 0;
      this.i = null;
      this.load();
    });
  }

  private load() {
    this.http.get(`/user-pro/${this.id}`).subscribe((res: any) => {
      res.status_obj = UserStatus[res.status];
      this.i = res;
    });
  }
}
