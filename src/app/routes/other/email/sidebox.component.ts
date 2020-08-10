import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { BrandService } from '@brand';

@Component({
  selector: 'email-sidebox',
  templateUrl: './sidebox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailSideboxComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  private brand$: Subscription;
  private inited = false;
  // Must be the same as `@email-sidebox-width`
  width = 250;
  type = 1;

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  changed = new EventEmitter<number>();

  constructor(public brand: BrandService, private cd: ChangeDetectorRef) {
    this.brand$ = brand.notify
      .pipe(filter(() => this.inited))
      .subscribe(() => this.cd.detectChanges());
  }

  ngAfterViewInit() {
    this.inited = true;
    this.changed.emit(this.type);
  }

  ngOnChanges() {
    this.cd.detectChanges();
  }

  changeType(type: number) {
    if (type === this.type) return;
    this.type = type;
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.changed.emit(this.type);
    this.cd.detectChanges();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnDestroy() {
    this.brand$.unsubscribe();
  }
}
