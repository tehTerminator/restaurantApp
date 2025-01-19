import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { MINUTE } from 'src/app/shared/constants';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  standalone: false,
})
export class OrderSummaryComponent implements OnChanges, OnInit, OnDestroy {
  @Input('location') location = 0;
  summary: OrderSummary = {
    total: 0,
    open: 0,
    amount: 0,
  };
  private interval: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.interval = setInterval(() => this.fetchOrders(), MINUTE);
  }

  ngOnDestroy(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && changes['location'].currentValue) {
      this.fetchOrders();
    }
  }

  private fetchOrders() {
    if (this.location <= 0) return;
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
