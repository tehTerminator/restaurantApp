import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
  imports: [CommonModule, InvoiceRoutingModule],
  declarations: [
    InvoiceComponent,
    CreateCustomerComponent,
    SearchCustomerComponent,
    SelectPaymentMethodComponent,
    TransactionsComponent,
  ],
})
export class InvoiceModule {}
