import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';

import { SysUserComponent } from './user/user.component';
import { SysUserViewComponent } from './user/view/view.component';
import { SysUserEditComponent } from './user/edit/edit.component';
import { SysMenuComponent } from './menu/menu.component';
import { SysPermissionComponent } from './permission/permission.component';
import { SysRoleComponent } from './role/role.component';
import { SysLogComponent } from './log/log.component';
import { SysFileManagerComponent } from './file-manager/file-manager.component';

const COMPONENTS = [
  SysUserComponent,
  SysUserViewComponent,
  SysUserEditComponent,
  SysMenuComponent,
  SysPermissionComponent,
  SysLogComponent,
  SysRoleComponent,
  SysFileManagerComponent,
];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysModule {}
