import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY_CUSTOMER, Customer } from 'src/app/interface/customer';
import { EMPTY_LOCATION, Location } from 'src/app/interface/location.interface';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Order } from 'src/app/interface/order.interface';

@Injectable()
export class MyInvoiceService implements OnDestroy {
  customer: Customer = EMPTY_CUSTOMER;
  orders$ = new BehaviorSubject<Order[]>([]);

  private _notifier$ = new Subject();
  private _location$ = new BehaviorSubject<Location>(EMPTY_LOCATION);

  constructor(private api: ApiService) {
    this._location$.pipe(takeUntil(this._notifier$)).subscribe((value) => {
      if (value.id > 0) this._loadOrders(value.id);
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
}
