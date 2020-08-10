import { Component } from '@angular/core';

declare const BMap: any;

@Component({
  selector: 'app-baidu',
  templateUrl: './baidu.component.html',
})
export class MapBaiduComponent {
  onReady(map: any) {
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('北京');
    map.enableScrollWheelZoom(true);
  }
}
