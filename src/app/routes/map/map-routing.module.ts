import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapGoogleComponent } from './google/google.component';
import { MapBaiduComponent } from './baidu/baidu.component';

const routes: Routes = [
  { path: 'google', component: MapGoogleComponent },
  { path: 'baidu', component: MapBaiduComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
