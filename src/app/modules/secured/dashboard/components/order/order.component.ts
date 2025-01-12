import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/interface/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input('order') order: Order | null = null;

  constructor() {}

  ngOnInit() {}
}
