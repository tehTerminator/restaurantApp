import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MyInvoiceService } from './my-invoice.service';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [CommonModule, InvoiceRoutingModule, CoreModule],
  declarations: [
    InvoiceComponent,
    CreateCustomerComponent,
    SearchCustomerComponent,
    SelectPaymentMethodComponent,
    TransactionsComponent,
  ],
  providers: [MyInvoiceService],
})
export class InvoiceModule {}
