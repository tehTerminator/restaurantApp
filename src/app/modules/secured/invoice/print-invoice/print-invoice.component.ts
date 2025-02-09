import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY_INVOICE, Invoice } from 'src/app/interface/invoice.interface';
import { Order } from 'src/app/interface/order.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css'],
  standalone: false,
})
export class PrintInvoiceComponent implements OnInit {
  invoice: Invoice = EMPTY_INVOICE;
  orders: Order[] = [];
  displayedColumns: string[] = ['productTitle', 'quantity', 'rate', 'amount'];
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private ns: NotificationsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!!id) {
      this.fetchInvoice(id);
    }
  }

  private fetchInvoice(id: string) {
    this.api.fetch<InvoiceData>('invoice', { id }).subscribe({
      next: (data) => {
        this.invoice = data.invoice;
        this.orders = data.orders;
      },
      error: (err) => {
        this.ns.show('Unable to Load Invoices');
        this.invoice = EMPTY_INVOICE;
        this.orders = [];
        console.error(err);
      },
    });
  }
}

interface InvoiceData {
  invoice: Invoice;
  orders: Order[];
}
