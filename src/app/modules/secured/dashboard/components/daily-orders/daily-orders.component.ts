import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { ValidateDenomiation } from '../../../calculator/currency-form/deno-validator';
import { Order } from 'src/app/interface/order.interface';
import { getCurrentDateString } from 'src/app/shared/functions';

@Component({
  selector: 'app-daily-orders',
  templateUrl: './daily-orders.component.html',
  styleUrls: ['./daily-orders.component.css'],
  standalone: false,
})
export class DailyOrdersComponent implements OnInit {
  dateField = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });
  orders: Order[] = [];
  constructor(private api: ApiService, private ns: NotificationsService) {}

  ngOnInit() {
    const date = getCurrentDateString();
    this.dateField.setValue(date);
  }

  fetchOrders() {
    const date = this.dateField.value;
    this.api.fetch<Order[]>('orders', { date }).subscribe({
      next: (data) => (this.orders = data),
      error: (err) => {
        this.ns.show('Unable to Load Data');
        console.error(err);
      },
    });
  }
}
