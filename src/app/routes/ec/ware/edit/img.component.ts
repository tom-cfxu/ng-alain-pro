import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Host,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { deepCopy } from '@delon/util';

import { WareEditService } from './edit.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const MAX = 5;

@Component({
  selector: 'app-ec-ware-edit-img',
  templateUrl: './img.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ECWareEditImgComponent implements OnInit, OnDestroy {
  private notify$: Subscription;
  private inited = false;

  ls: any[] = [];

  get i() {
    return this.srv.i;
  }

  constructor(
    @Host() private srv: WareEditService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.notify$ = this.srv.change
      .pipe(filter(type => type === 'img'))
      .subscribe(() => this.load());
  }

  private load() {
    if (!this.inited) {
      this.inited = true;
      const imgs = this.i.imgs;
      // image data format: `{ [colorId]: string[] }`
      // {
      //   0: ['https://randomuser.me/api/portraits/lego/0.jpg'],
      //   1: ['https://randomuser.me/api/portraits/lego/1.jpg'],
      //   3: ['https://randomuser.me/api/portraits/lego/3.jpg'],
      // }
      this.ls = Object.keys(imgs).map(colorId => ({
        ls: imgs[colorId],
        id: +colorId,
      }));
    }

    // 只对颜色有效，以 `colorId` 为判断标准
    const oldData = deepCopy(this.ls) as any[];
    const ls: any[] = [];
    [0].concat(this.srv.colors.map(i => i.id)).forEach(id => {
      const oldItem = oldData.find(w => w.id === id) || {};
      const item = this.srv.colors.find(w => w.id === id);
      if (item) {
        oldItem.color = item.color;
        oldItem.text = item.value;
      }
      oldItem.id = id;
      ls.push(oldItem);
    });

    // 填充每一项的最大图像数量
    ls.forEach(i => {
      i.ls = ((i.ls as string[]) || [])
        .concat(...Array(MAX))
        .slice(0, MAX)
        .map(a => a || '');
    });
    this.srv.i.imgs = this.ls = ls;
    this.cd.detectChanges();
  }

  del(i: any, idx: number) {
    i.ls[idx] = '';
  }

  cho(item: any, ls: any[]) {
    const isFull =
      (item.ls as string[]).filter(w => w.length === 0).length === 0;

    let curPos = 0;
    for (let i = 0; i < MAX; i++) {
      if ((isFull || item.ls[i].length === 0) && ls.length > curPos) {
        item.ls[i] = ls[curPos++].mp;
      }
    }
  }

  copy(i: any) {
    i.ls = deepCopy(this.ls[0].ls);
  }

  drop(list: any[], e: CdkDragDrop<any[]>) {
    moveItemInArray(list, e.previousIndex, e.currentIndex);
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
