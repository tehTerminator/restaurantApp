import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.scss',
  standalone: false,
})
export class DayViewComponent implements OnInit {
  selectedDate = '';
  report: DayReport | null = null;
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  getReport() {
    this.api
      .fetch<DayReport>(['report', 'day-view'], { date: this.selectedDate })
      .subscribe({
        next: (value) => {
          this.report = value;
          let amount = 0;
          this.report?.payment.forEach((item) => {
            if (item.payment_method !== 'UNPAID')
              amount += Number.parseInt(item.totalAmount);
          });
          this.report.orderAmount = amount;
        },
      });
  }
}

interface DayReport {
  totalOrders: number;
  cancelledOrders: number;
  orderAmount: number;
  orders: Array<{
    totalAmount: number;
    product_id: number;
    quantity: number;
    product: Product;
  }>;
  payment: Array<{
    totalAmount: string;
    payment_method: 'CASH' | 'UPI' | 'UNPAID';
  }>;
}
