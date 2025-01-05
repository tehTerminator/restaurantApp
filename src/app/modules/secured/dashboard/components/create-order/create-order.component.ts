import { ApiService } from 'src/app/services/api/api.service';
import { OrderService } from './../../services/orders.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements AfterViewInit {
  loading = false;
  constructor(private orderService: OrderService, private api: ApiService) {}
  ngAfterViewInit(): void {
    this.loading = true;
    const orders = this.orderService.getOrders();
    this.api.create('orders', orders).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
