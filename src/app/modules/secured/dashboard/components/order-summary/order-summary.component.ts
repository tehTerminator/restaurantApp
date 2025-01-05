import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnChanges {
  @Input('location') location = 0;
  summary: OrderSummary = {
    total: 0,
    open: 0,
    amount: 0,
  };

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && changes['location'].currentValue) {
      this.fetchOrders();
    }
  }

  private fetchOrders() {
    this.api
      .fetch<OrderSummary>(['location', 'orderSummary'], {
        location_id: this.location.toString(),
      })
      .subscribe({
        next: (value) => (this.summary = value),
      });
  }
}

interface OrderSummary {
  total: number;
  open: number;
  amount: number;
}
