import { finalize } from 'rxjs';
import { AfterViewInit, Component } from '@angular/core';
import { OrderService } from '../../services/orders.service';
import { Order } from 'src/app/interface/order.interface';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements AfterViewInit {
  orders: Order[] = [];
  private location_id = 0;
  loading = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private api: ApiService,
    private notification: NotificationsService
  ) {}

  ngAfterViewInit(): void {
    this.orders = this.orderService.getOrders();
    this.location_id = this.orders[0].location_id;
  }

  prev() {
    this.router.navigate([
      '/auth',
      'dashboard',
      'select-products',
      this.location_id,
    ]);
  }

  next() {
    this.loading = true;
    this.api.create('orders', this.orders).subscribe({
      next: (data) => {
        this.notification.show('Orders Created Success');
        this.router.navigate(['/auth', 'dashboard']);
      },
      error: (err) => {
        this.notification.show('Unable to Store Order');
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
