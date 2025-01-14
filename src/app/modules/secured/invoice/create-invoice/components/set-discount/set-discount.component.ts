import { Component, OnInit } from '@angular/core';
import { MyInvoiceService } from '../../../my-invoice.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-discount',
  templateUrl: './set-discount.component.html',
  styleUrls: ['./set-discount.component.css'],
})
export class SetDiscountComponent implements OnInit {
  discountFC = new FormControl<number>(0, { nonNullable: true });
  constructor(private invoiceStore: MyInvoiceService) {}

  ngOnInit() {
    const maxDiscount = Math.floor(this.invoiceStore.amount / 2);
    this.discountFC.addValidators([
      Validators.max(maxDiscount),
      Validators.min(0),
    ]);
  }

  setDiscount() {
    if (this.discountFC.value >= 0)
      this.invoiceStore.discount = this.discountFC.value;
    else alert('Cant Set Discount');
  }
}
