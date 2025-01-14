import { Component, OnInit } from '@angular/core';
import { MyInvoiceService } from '../../../my-invoice.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Order } from 'src/app/interface/order.interface';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TransactionsComponent implements OnInit {
  constructor(private invoiceStore: MyInvoiceService) {}

  ngOnInit() {}

  get orders$(): Observable<Order[]> {
    return this.invoiceStore.orders$ as Observable<Order[]>;
  }

  get amount$(): Observable<number> {
    return this.invoiceStore.amount$;
  }

  get discount$(): Observable<number> {
    return this.invoiceStore.discount$;
  }

  get netAmount$(): Observable<number> {
    return combineLatest([this.amount$, this.discount$]).pipe(
      map(([amount, discount]) => amount - discount)
    );
  }
}
