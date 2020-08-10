import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { BrandService } from '@brand';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  type = 1;
  list: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    public brand: BrandService,
  ) {}

  ngOnInit() {
    this.http.get('/task').subscribe((res: any) => (this.list = res));
  }

  del(p: any, i: any, idx: number) {
    this.http.delete('/task', { cid: p.id, id: i.id }).subscribe(() => {
      this.msg.success('Success');
      p.list.splice(idx, 1);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
