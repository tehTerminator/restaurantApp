import { Injectable } from '@angular/core';
import { InvoiceModule } from './invoice.module';
import { EMPTY_CUSTOMER } from 'src/app/interface/customer';

@Injectable({
  providedIn: InvoiceModule,
})
export class MyInvoiceService {
  customer: Customer = EMPTY_CUSTOMER;
  constructor() {}
}
