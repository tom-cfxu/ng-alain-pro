import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  ComponentFactoryResolver,
  OnDestroy,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';
import { DDWidget } from '../dd.types';
import { DDBaseWidget } from './base.widget';

@Component({
  selector: 'dd-container',
  templateUrl: './container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDContainerComponent implements OnChanges, OnDestroy {
  @Input()
  readonly config: DDWidget;
  @ViewChild('target', { read: ViewContainerRef, static: true })
  private container: ViewContainerRef;

  comp: ComponentRef<DDBaseWidget>;
  loading = false;

  constructor(private resolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {}

  refresh(): void {
    if (!this.comp) return;
    this.loading = true;
    this.cdr.detectChanges();
    this.comp.instance.load().then(() => {
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(): void {
    if (!this.config.type) {
      console.warn(`Not Found ${this.config.name} widget`);
      return;
    }
    const compFactory = this.resolver.resolveComponentFactory<DDBaseWidget>(this.config.type);
    this.comp = this.container.createComponent(compFactory);
    this.comp.instance.params = this.config.params;
    this.refresh();
  }

  ngOnDestroy(): void {
    if (this.comp) {
      this.comp.destroy();
    }
  }
}
