import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInvoiceRoutingModule } from './search-invoice-routing.module';
import { SearchInvoiceComponent } from './search-invoice.component';
import { CoreModule } from 'src/app/modules/core/core.module';

@NgModule({
  declarations: [SearchInvoiceComponent],
  imports: [CommonModule, CoreModule, SearchInvoiceRoutingModule],
})
export class SearchInvoiceModule {}
