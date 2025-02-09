import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { Order } from 'src/app/interface/order.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { SECOND } from 'src/app/shared/constants';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css'],
  standalone: false,
})
export class OpenOrdersComponent implements OnInit, OnDestroy {
  orders$ = new BehaviorSubject<Order[]>([]);
  displayedColumns: string[] = [
    'id',
    'product',
    'quantity',
    'status',
    'comments',
    'location',
    'actions',
  ];
  dataSource = new MatTableDataSource<Order>();
  private _interval: any = null;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.orders$.subscribe((orders) => {
      this.dataSource.data = orders || [];
    });
    this.getOrders();
    this._interval = setInterval(() => this.getOrders(), SECOND * 30);
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  getOrders() {
    this.api.fetch<Order[]>(['orders', 'open']).subscribe({
      next: (orders) => {
        const currentOrders = this.orders$.value;
        if (!isEqual(orders, currentOrders)) this.orders$.next(orders);
      },
      error: (err) => {
        this.orders$.next([]);
        console.error(err);
      },
    });
  }

  completeOrder = (id: number) => this.updateStatus(id, 'COMPLETE');
  cancelOrder = (id: number) => this.updateStatus(id, 'CANCELLED');
  acceptOrder = (id: number) => this.updateStatus(id, 'ACCEPTED');

  private updateStatus(
    id: number,
    status: 'ACCEPTED' | 'COMPLETE' | 'CANCELLED'
  ) {
    this.api
      .update<Order>(['order', 'update', 'status'], { id, status })
      .subscribe({
        next: (order) => this.replaceOrder(order),
      });
  }

  replaceOrder(order: Order) {
    const oldOrders = this.orders$.value;
    const index = oldOrders.findIndex((x) => x.id === order.id);
    oldOrders[index] = order;
    this.orders$.next(oldOrders);

    if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
      this.removeOrder(order);
    }
  }

  removeOrder(order: Order) {
    setTimeout(() => {
      const oldOrder = this.orders$.value;
      const index = oldOrder.findIndex((x) => x.id === order.id);
      oldOrder.splice(index, 1);
      this.orders$.next(oldOrder);
    }, 3 * SECOND);
  }
}
