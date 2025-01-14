import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './create-invoice/invoice.component';
import { InvoiceRoutingModule } from './invoice.routing';
import { CreateCustomerComponent } from './create-invoice/components/create-customer/create-customer.component';
import { SearchCustomerComponent } from './create-invoice/components/search-customer/search-customer.component';
import { SelectPaymentMethodComponent } from './create-invoice/components/select-payment-method/select-payment-method.component';
import { TransactionsComponent } from './create-invoice/components/transactions/transactions.component';
import { MyInvoiceService } from './my-invoice.service';
import { CoreModule } from '../../core/core.module';
import { SetDiscountComponent } from './create-invoice/components/set-discount/set-discount.component';

@NgModule({
  imports: [CommonModule, InvoiceRoutingModule, CoreModule],
  declarations: [
    InvoiceComponent,
    CreateCustomerComponent,
    SearchCustomerComponent,
    SelectPaymentMethodComponent,
    SetDiscountComponent,
    TransactionsComponent,
  ],
  providers: [MyInvoiceService],
})
export class InvoiceModule {}
