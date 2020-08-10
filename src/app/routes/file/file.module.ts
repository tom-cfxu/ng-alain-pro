import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { FileRoutingModule } from './file-routing.module';

import { FileDocxComponent } from './docx/docx.component';
import { FileXlsxComponent } from './xlsx/xlsx.component';
import { FilePdfComponent } from './pdf/pdf.component';

const COMPONENTS = [FileDocxComponent, FileXlsxComponent, FilePdfComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, FileRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class FileModule {}
