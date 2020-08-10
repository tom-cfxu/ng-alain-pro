import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Host,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';

import { WareEditService } from './edit.service';

@Component({
  selector: 'app-ec-ware-edit-sku',
  templateUrl: './sku.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ECWareEditSkuComponent implements OnInit, OnDestroy {
  private notify$: Subscription;

  get i() {
    return this.srv.i;
  }

  get cog() {
    return this.srv.cog;
  }

  get properties() {
    return this.cog.list.filter(w => w.sel);
  }

  constructor(
    @Host() private srv: WareEditService,
    private cd: ChangeDetectorRef,
    private http: _HttpClient,
  ) {}

  ngOnInit() {
    this.notify$ = this.srv.change
      .pipe(
        filter(type => type === 'cat'),
        mergeMap(() => this.http.get('/ware/cat')),
      )
      .subscribe((res: any) => {
        this.srv.skuLoad(res).then(() => this.cho());
      });
  }

  cho() {
    this.srv.skuCho();
    this.srv.notify('img');
    setTimeout(() => this.cd.markForCheck());
  }

  getValidName(nams: string[]) {
    return nams.filter(a => !!a);
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
