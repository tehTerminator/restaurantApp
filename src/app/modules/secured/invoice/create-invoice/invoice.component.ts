import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyInvoiceService } from '../my-invoice.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Location } from 'src/app/interface/location.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Customer } from 'src/app/interface/customer';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private api: ApiService,
    private invoiceStore: MyInvoiceService,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const location = this.route.snapshot.paramMap.get('location');
    if (!!location) {
      this.api.fetch<Location>('location', { id: location }).subscribe({
        next: (value) => {
          this.invoiceStore.location = value;
        },
        error: (err) => {
          this.notification.show('Table Not Found');
          this.router.navigate(['/auth']);
        },
      });
    }
  }

  get customer(): Customer {
    return this.invoiceStore.customer;
  }
}
