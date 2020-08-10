import { Component, TemplateRef, OnInit } from '@angular/core';
import { Menu, _HttpClient } from '@delon/theme';
import {
  NzFormatEmitEvent,
  NzDropdownService,
  NzDropdownContextComponent,
  NzTreeNode,
  NzFormatBeforeDropEvent,
  NzMessageService,
} from 'ng-zorro-antd';
import { ArrayService } from '@delon/util';
import { SFSchema } from '@delon/form';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sys-menu',
  templateUrl: './menu.component.html',
})
export class SysMenuComponent implements OnInit {
  private menuEvent: NzFormatEmitEvent;
  private contextMenu: NzDropdownContextComponent;

  data: NzTreeNode[] = [];
  op: string;
  item: Menu;
  delDisabled = false;

  schema: SFSchema = {
    properties: {
      text: { type: 'string', title: '名称' },
      i18n: { type: 'string', title: '国际化' },
      group: { type: 'boolean', title: '菜单组' },
      acl: { type: 'string', title: 'ACL' },
      reuse: { type: 'boolean', title: '复用' },
      link: { type: 'string', title: '路由' },
      hide: { type: 'boolean', title: '隐藏' },
      hideInBreadcrumb: { type: 'boolean', title: '隐藏导航' },
      shortcut: { type: 'boolean', title: '允许快捷' },
      icon: { type: 'string', title: '图标' },
      sort: { type: 'number', title: '排序值' },
    },
    required: ['text'],
    ui: { grid: { md: 24, lg: 12 }, spanLabelFixed: 100 },
  };

  constructor(
    private http: _HttpClient,
    private ddSrv: NzDropdownService,
    private arrSrv: ArrayService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.http.get('/menus').subscribe((res: Menu[]) => {
      this.data = this.arrSrv.arrToTreeNode(res, {
        titleMapName: 'text',
        cb: (item, parent, deep) => {
          item.expanded = deep <= 1;
        },
      });
    });
  }

  add(item: any) {
    this.closeContextMenu();
    this.op = 'edit';
    this.item = {
      id: 0,
      text: '',
      parent_id: item ? item.id : 0,
    };
  }

  edit() {
    this.closeContextMenu();
    this.op = 'edit';
  }

  save(item: any) {
    this.http.post('/menus', item).subscribe(() => {
      if (item.id <= 0) {
        this.getData();
        this.op = '';
      } else {
        this.item = item;
        this.menuEvent.node.title = item.text;
        this.menuEvent.node.origin = item;
        this.op = 'view';
      }
    });
  }

  del() {
    this.closeContextMenu();
    this.http.delete(`/menus/${this.item.id}`).subscribe(() => {
      this.getData();
      this.op = '';
    });
  }

  get delMsg(): string {
    const childrenLen = this.menuEvent.node.children.length;
    if (childrenLen === 0) {
      return `确认删除【${this.menuEvent.node.title}】吗？`;
    }
    return `确认删除【${this.menuEvent.node.title}】以及所有子菜单吗？`;
  }

  move = (e: NzFormatBeforeDropEvent) => {
    if (e.pos !== 0) {
      this.msg.warning(`只支持菜单不同类目的移动，且无法移动至顶层`);
      return of(false);
    }
    if (e.dragNode.origin.parent_id === e.node.origin.id) {
      return of(false);
    }
    const from = e.dragNode.origin.id;
    const to = e.node.origin.id;
    return this.http
      .post('/menus/move', {
        from,
        to,
      })
      .pipe(
        tap(() => (this.op = '')),
        map(() => true),
      );
  };

  show(e: NzFormatEmitEvent) {
    this.op = e.node.isSelected ? 'view' : '';
    this.item = e.node.origin as any;
  }

  showContextMenu(e: NzFormatEmitEvent, tpl: TemplateRef<void>) {
    this.menuEvent = e;
    this.delDisabled = e.node.children.length !== 0;
    this.contextMenu = this.ddSrv.create(e.event, tpl);
  }

  closeContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.close();
    }
  }
}
