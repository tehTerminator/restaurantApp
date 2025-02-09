import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Invoice } from 'src/app/interface/invoice.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { getCurrentDateString } from 'src/app/shared/functions';

@Component({
  selector: 'app-search-invoice',
  standalone: false,

  templateUrl: './search-invoice.component.html',
  styleUrl: './search-invoice.component.scss',
})
export class SearchInvoiceComponent {
  dateField = new FormControl(getCurrentDateString(), {
    validators: [Validators.required],
    nonNullable: true,
  });
  invoices: Invoice[] = [];
  loading = false;

  constructor(private api: ApiService, private ns: NotificationsService) {}

  getInvoices() {
    if (this.dateField.invalid) {
      return;
    }
    this.loading = true;

    this.api
      .fetch<Invoice[]>('invoices', { date: this.dateField.value })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.invoices = data;
        },
        error: (err) => {
          this.ns.show('Unable to Load Invoices');
          console.error(err);
        },
      });
  }
}
