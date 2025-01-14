import { Component } from '@angular/core';
import { MyInvoiceService } from '../../../my-invoice.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Invoice } from 'src/app/interface/invoice.interface';
import { retry } from 'rxjs';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.css'],
})
export class SelectPaymentMethodComponent {
  constructor(
    private invoiceStore: MyInvoiceService,
    private api: ApiService
  ) {}

  selectPaymentMethod(method: string) {
    const amount = this.invoiceStore.amount;
    const discount = this.invoiceStore.discount;
    const payment_method = method;
    const customer_id = this.invoiceStore.customer.id;
    const location_id = this.invoiceStore.location.id;

    this.api
      .create<Invoice>('invoice', {
        amount,
        discount,
        payment_method,
        customer_id,
        location_id,
      })
      .pipe(retry(2))
      .subscribe({
        next: () => {},
      });
  }
}
