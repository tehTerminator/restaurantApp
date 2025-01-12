import { Component, OnInit } from '@angular/core';
import { MyInvoiceService } from '../../my-invoice.service';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/interface/order.interface';
import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  animations: [ trigger('fadeIn', [ transition(':enter', [ style({ opacity: 0 }), animate('500ms ease-in', style({ opacity: 1 })), ]), ]), ],
})
export class TransactionsComponent implements OnInit {
  constructor(private invoiceStore: MyInvoiceService) {}

  ngOnInit() {}

  get orders$(): Observable<Order[]> {
    return this.invoiceStore.orders$ as Observable<Order[]>;
  }

  get amount$(): Observable<number> {
    return this.orders$.pipe(
      map((x) => {
        let amount = 0;
        x.forEach((item) => {
          amount += item.quantity * item.rate;
        });
        return amount;
      })
    );
  }
}
