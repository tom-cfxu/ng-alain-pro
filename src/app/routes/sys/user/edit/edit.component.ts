import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { ArrayService, deepCopy } from '@delon/util';
import { NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-sys-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class SysUserEditComponent {
  id = 0;
  i: any;
  roles: NzTreeNode[];
  pers: NzTreeNode[];
  permissions = [
    { name: 'Users', read: true, write: false, create: false, delete: false },
    { name: 'Articles', read: true, write: true, create: true, delete: false },
    { name: 'Staff', read: false, write: false, create: false, delete: false },
  ];
  constructor(
    route: ActivatedRoute,
    private http: _HttpClient,
    private arrSrv: ArrayService,
    private msg: NzMessageService,
    private router: Router,
  ) {
    route.params.subscribe(res => {
      this.id = res.id || 0;
      this.i = null;
      this.load();
    });
  }

  private load() {
    forkJoin(
      this.id > 0
        ? this.http.get(`/user-pro/${this.id}`)
        : of({
            id: 0,
            status: 'active',
            role: { id: undefined },
          }),
      this.http.get('/role'),
      this.http.get('/permission'),
    ).subscribe(([i, role, pers]: [any, any[], any[]]) => {
      this.i = i;
      this.roles = this.arrSrv.arrToTreeNode(deepCopy(role), {
        titleMapName: 'text',
      });
      const curRole = role.find(w => w.id === i.role.id);
      const curPers: number[] = curRole ? curRole.permission || [] : [];
      this.pers = this.arrSrv.arrToTreeNode(deepCopy(pers), {
        titleMapName: 'text',
        cb: (item: any) => {
          item.disabled = curPers.includes(item.id);
        },
      });
      console.log(curPers, this.pers);
    });
  }

  save() {
    const item = this.i;
    this.http.post('/user-pro', item).subscribe(() => {
      this.msg.success('Save Success!');
      this.cancel();
    });
  }

  cancel() {
    this.router.navigateByUrl('/sys/user');
  }
}
