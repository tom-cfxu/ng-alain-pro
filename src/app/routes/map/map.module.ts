import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AbmModule } from 'angular-baidu-maps';

import { SharedModule } from '@shared';
import { MapRoutingModule } from './map-routing.module';

import { MapGoogleComponent } from './google/google.component';
import { MapBaiduComponent } from './baidu/baidu.component';

const COMPONENTS = [MapGoogleComponent, MapBaiduComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALxb-cRGW21h96bc4iPLt15EvmI7fVw8I',
    }),
    AbmModule.forRoot({ apiKey: '8oZDc2QBZSbjNpoC42cd5jGVa3GknG1c' }),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class MapModule {}
