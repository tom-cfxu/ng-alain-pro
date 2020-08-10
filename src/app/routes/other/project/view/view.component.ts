import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  private router$: Subscription;
  idx = 0;
  id = 0;
  i: any;

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    public msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.router$ = this.route.params.subscribe(res => {
      this.id = res.id || 0;
      this.load();
    });
  }

  load() {
    this.http.get(`/project/${this.id}`).subscribe((res: any) => {
      this.i = res;
      this.cd.detectChanges();
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

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
