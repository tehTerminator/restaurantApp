import { Order } from './../../../../interface/order.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orders = new BehaviorSubject<Order[]>([]);

  clear(): void {
    this._orders.next([]);
  }

  add(order: Order): void {
    const orders = this._orders.value;
    this._orders.next([...orders, order]);
  }

  setOrders(orders: Order[]): void {
    this._orders.next(orders);
  }

  getOrders(): Order[] {
    return [...this._orders.value];
  }
}
