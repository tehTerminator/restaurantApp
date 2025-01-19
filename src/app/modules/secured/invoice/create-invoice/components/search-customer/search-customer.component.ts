import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Customer, EMPTY_CUSTOMER } from 'src/app/interface/customer';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { MyInvoiceService } from '../../../my-invoice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-customer',
    templateUrl: './search-customer.component.html',
    styleUrls: ['./search-customer.component.css'],
    standalone: false
})
export class SearchCustomerComponent implements OnInit {
  mobileField = new FormControl('9999999999', {
    validators: [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
    nonNullable: true,
  });

  customer = EMPTY_CUSTOMER;

  constructor(
    private api: ApiService,
    private notice: NotificationsService,
    private invoiceStore: MyInvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  searchCustomer() {
    if (this.mobileField.invalid) {
      return;
    }
    this.api.fetch<Customer>(['customer', this.mobile]).subscribe({
      next: (value) => {
        if (!value) {
          this.notice.show('Looks like New Customer');
          this.router.navigate(['../create-customer'], {
            relativeTo: this.route,
            queryParams: { mobile: this.mobile },
          });
        } else {
          this.customer = value;
        }
      },
      error: () => {
        this.notice.show('Error While Fetching Data');
      },
    });
  }

  setCustomer() {
    this.invoiceStore.customer = this.customer;
    this.router.navigate(['../set-discount'], {
      relativeTo: this.route,
    });
  }

  get mobile(): string {
    return this.mobileField.value;
  }
}
