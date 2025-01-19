import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, startWith } from 'rxjs';
import { Order } from 'src/app/interface/order.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { SECOND } from 'src/app/shared/constants';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('buttonPress', [
      state('default', style({ transform: 'scale(1)' })),
      state('pressed', style({ transform: 'scale(0.95)' })),
      transition('default <=> pressed', [animate('100ms ease-in-out')]),
    ]),
  ],
})
export class OpenOrdersComponent implements OnInit {
  orders$ = new BehaviorSubject<Order[]>([]);
  displayedColumns: string[] = [
    'product',
    'quantity',
    'status',
    'comments',
    'location',
    'actions',
  ];
  dataSource = new MatTableDataSource<Order>();
  buttonState = 'default';
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.orders$.subscribe((orders) => {
      this.dataSource.data = orders || [];
    });
    this.getOrders();
  }

  getOrders() {
    this.api.fetch<Order[]>(['orders', 'open']).subscribe({
      next: (orders) => {
        this.orders$.next(orders);
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
    oldOrders.splice(index, 1, order);
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

  onButtonClick() {
    this.buttonState = 'pressed';
    setTimeout(() => {
      this.buttonState = 'default';
    }, 100);
  }
}
