import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY_CUSTOMER, Customer } from 'src/app/interface/customer';
import { EMPTY_LOCATION, Location } from 'src/app/interface/location.interface';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Order } from 'src/app/interface/order.interface';

@Injectable()
export class MyInvoiceService implements OnDestroy {
  customer: Customer = EMPTY_CUSTOMER;
  orders$ = new BehaviorSubject<Order[]>([]);
  discount$ = new BehaviorSubject<number>(0);
  amount$ = new BehaviorSubject<number>(0);

  private _notifier$ = new Subject();
  private _location$ = new BehaviorSubject<Location>(EMPTY_LOCATION);

  constructor(private api: ApiService) {
    this._location$.pipe(takeUntil(this._notifier$)).subscribe((value) => {
      if (value.id > 0) this._loadOrders(value.id);
    });
    this.orders$.pipe(takeUntil(this._notifier$)).subscribe((orders) => {
      let amount = 0;
      orders.forEach((item) => {
        amount += item.quantity * item.rate;
      });
      this.amount$.next(amount);
    });
  }

  ngOnDestroy(): void {
    this._notifier$.next(0);
    this._notifier$.complete();
  }

  private _loadOrders(id: number) {
    this.api
      .fetch<Order[]>(['orders', 'completed'], { location_id: id.toString() })
      .subscribe({
        next: (value) => this.orders$.next(value),
      });
  }

  get location(): Location {
    return this._location$.value;
  }

  set location(loc: Location) {
    this._location$.next(loc);
  }

  set discount(value: number) {
    if (value > this.amount || value < 0) value = 0;
    this.discount$.next(value);
  }

  get discount(): number {
    return this.discount$.value;
  }

  get amount(): number {
    return this.amount$.value;
  }
}
