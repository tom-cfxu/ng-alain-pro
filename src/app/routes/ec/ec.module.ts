import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { ECRoutingModule } from './ec-routing.module';

import { ECWareComponent } from './ware/list.component';
import { ECWareViewComponent } from './ware/view/view.component';
import { ECWareEditComponent } from './ware/edit/edit.component';
import { ECWareEditSkuComponent } from './ware/edit/sku.component';
import { ECWareEditImgComponent } from './ware/edit/img.component';
import { ECTradeComponent } from './trade/list.component';
import { ECTradeViewComponent } from './trade/view.component';
import { ECTradeMemoComponent } from './trade/memo.component';

const COMPONENTS = [
  ECWareComponent,
  ECWareViewComponent,
  ECWareEditComponent,
  ECTradeComponent,
];

const COMPONENTS_NOROUNT = [
  ECWareEditSkuComponent,
  ECWareEditImgComponent,
  ECTradeViewComponent,
  ECTradeMemoComponent,
];

@NgModule({
  imports: [SharedModule, ECRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ECModule {}
